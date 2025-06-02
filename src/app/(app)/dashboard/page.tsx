import Image from 'next/image';
import Link from 'next/link';

// Mock data untuk resep
const recommendedRecipes = [
  { id: '1', title: "Nasi Goreng Spesial", imageUrl: "/images/placeholder-nasgor.jpg", link: "/recipes/1" },
  { id: '2', title: "Ayam Bakar Madu", imageUrl: "/images/placeholder-ayambakar.jpg", link: "/recipes/2" },
  { id: '3', title: "Capcay Kuah Seafood", imageUrl: "/images/placeholder-capcay.jpg", link: "/recipes/3" },
  { id: '4', title: "Soto Ayam Lamongan", imageUrl: "/images/placeholder-soto.jpg", link: "/recipes/4" },
  { id: '5', title: "Gado-Gado Siram", imageUrl: "/images/placeholder-gadogado.jpg", link: "/recipes/5" },
  { id: '6', title: "Rendang Daging", imageUrl: "/images/placeholder-rendang.jpg", link: "/recipes/6" },
];

// Mock data untuk bahan yang akan kedaluwarsa
const expiringIngredients = [
  { id: 'ing1', name: "Dada Ayam Fillet", daysLeft: 2 },
  { id: 'ing2', name: "Sawi Hijau", daysLeft: 3 },
  { id: 'ing3', name: "Susu UHT Full Cream", daysLeft: 4 },
  { id: 'ing4', name: "Tomat Cherry", daysLeft: 5 },
  { id: 'ing5', name: "Telur Ayam Negeri", daysLeft: 7 },
];

interface RecipeCardProps {
  title: string;
  imageUrl: string;
  link: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, imageUrl, link }) => {
  return (
    <Link href={link} className="flex-shrink-0 w-64 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white group">
      <div className="relative h-40 w-full">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-300">{title}</h3>
      </div>
    </Link>
  );
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col space-y-8">
        {/* Bagian Recommended Recipe */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Recommended Recipe</h2>
          <div className="flex overflow-x-auto space-x-4 sm:space-x-6 pb-4 -mb-4">
            {recommendedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} title={recipe.title} imageUrl={recipe.imageUrl} link={recipe.link} />
            ))}
            {/* Tambahkan elemen kosong di akhir untuk padding visual jika diperlukan */}
            <div className="flex-shrink-0 w-1"></div>
          </div>
        </section>

        {/* Bagian Ingredients Expiring Soon */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Ingredients Expiring Soon (Next 7 Days)
          </h2>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            {expiringIngredients.length > 0 ? (
              <ul className="space-y-3">
                {expiringIngredients.map((ingredient) => (
                  <li key={ingredient.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-yellow-100 transition-colors duration-200">
                    <span className="text-gray-700">{ingredient.name}</span>
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                      ingredient.daysLeft <= 3 ? 'bg-red-200 text-red-800' : 
                      ingredient.daysLeft <= 5 ? 'bg-yellow-200 text-yellow-800' : 
                      'bg-green-200 text-green-800'
                    }`}>
                      {ingredient.daysLeft} days left
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No ingredients are expiring in the next 7 days. Great job!</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}