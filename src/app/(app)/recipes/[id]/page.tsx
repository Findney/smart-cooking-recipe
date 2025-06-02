import Image from 'next/image';
import Link from 'next/link'; // Untuk tombol navigasi
import { ClockIcon, UserGroupIcon, SparklesIcon, ClipboardIcon, PlayIcon, ScaleIcon } from '@heroicons/react/24/outline'; // Contoh ikon

// Mock data untuk satu resep detail
// Nantinya, data ini akan diambil berdasarkan params.id
const recipeDetail = {
  id: '1',
  title: "Nasi Goreng Spesial Keluarga",
  description: "Nasi goreng spesial dengan paduan bumbu rahasia keluarga, potongan ayam juicy, udang segar, dan telur orak-arik yang melimpah. Disajikan hangat dengan taburan bawang goreng renyah, acar mentimun segar, dan kerupuk udang gurih. Sempurna untuk sarapan, makan siang, ataupun makan malam istimewa bersama keluarga.",
  longDescription: "Resep ini merupakan warisan turun-temurun yang selalu menjadi favorit. Kunci kelezatannya terletak pada keseimbangan rasa manis, asin, dan gurih, serta penggunaan bahan-bahan segar berkualitas. Proses memasaknya pun cukup mudah dan cepat, sehingga cocok bagi Anda yang memiliki kesibukan namun tetap ingin menyajikan hidangan lezat dan bergizi.",
  imageUrl: "/images/placeholder-nasgor.jpg", // Pastikan gambar ini ada di public/images
  prepTimeMinutes: 15,
  cookTimeMinutes: 20,
  servings: 2,
  ingredients: [
    { id: 'i1', name: "Nasi putih dingin", quantity: "2 piring" },
    { id: 'i2', name: "Bawang putih", quantity: "3 siung", notes: "cincang halus" },
    { id: 'i3', name: "Bawang merah", quantity: "2 buah", notes: "iris tipis" },
    { id: 'i4', name: "Telur ayam", quantity: "2 butir" },
    { id: 'i5', name: "Dada ayam fillet", quantity: "100 gram", notes: "potong dadu" },
    { id: 'i6', name: "Udang kupas", quantity: "50 gram" },
    { id: 'i7', name: "Kecap manis", quantity: "2 sdm" },
    { id: 'i8', name: "Saus tiram", quantity: "1 sdm" },
    { id: 'i9', name: "Garam & Merica", quantity: "secukupnya" },
  ],
  instructions: [
    { step: 1, description: "Panaskan minyak, buat telur orak-arik, angkat dan sisihkan." },
    { step: 2, description: "Tumis bawang putih dan bawang merah hingga harum. Masukkan ayam dan udang, masak hingga berubah warna." },
    { step: 3, description: "Masukkan nasi, aduk rata. Bumbui dengan kecap manis, saus tiram, garam, dan merica." },
    { step: 4, description: "Masak hingga bumbu meresap dan nasi sedikit kering. Masukkan kembali telur orak-arik." },
    { step: 5, description: "Aduk rata, koreksi rasa. Sajikan selagi hangat dengan pelengkap." },
  ],
  estimatedNutrition: { calories: 650, protein: "30g", carbs: "80g", fat: "22g" }
};

// Placeholder untuk ikon jika @heroicons/react tidak diinstall
const IconPlaceholder = ({ className }: { className?: string }) => <div className={`w-6 h-6 bg-gray-300 rounded ${className}`} />;

export default function SingleRecipePage({ params }: { params: { id: string } }) {
  // Di aplikasi nyata, Anda akan menggunakan params.id untuk mengambil data resep
  // const recipe = await fetchRecipeById(params.id);
  const recipe = recipeDetail; // Menggunakan mock data

  if (!recipe) {
    return <div className="container mx-auto p-8 text-center">Recipe not found.</div>;
  }

  const totalCookTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Bagian Gambar Utama Resep */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full">
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            layout="fill"
            objectFit="cover"
            priority // Penting untuk LCP
          />
        </div>

        <div className="p-6 md:p-8">
          {/* Judul Resep */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {recipe.title}
          </h1>

          {/* Deskripsi Singkat */}
          <p className="text-gray-600 text-lg mb-6">
            {recipe.description}
          </p>

          {/* Informasi Kunci: Waktu Memasak */}
        <div className="mb-8 p-4 bg-green-50 rounded-lg max-w-[150px]">
        <div className="flex items-center space-x-2 w-full">
            <ClockIcon className="w-8 h-8 text-green-600" />
            <div>
            <p className="text-sm text-gray-500">Total Time</p>
            <p className="text-md font-semibold text-gray-700">{totalCookTime} min</p>
            </div>
        </div>
        </div>


          {/* Estimasi Nutrisi - Sesuai dengan proposal [cite: 34] */}
          <div className="mb-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
              <ScaleIcon className="w-6 h-6 text-blue-600 mr-2" /> Estimasi Fakta Nutrisi (per porsi)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <p><span className="font-medium text-gray-600">Kalori:</span> {recipe.estimatedNutrition.calories} kcal</p>
              <p><span className="font-medium text-gray-600">Protein:</span> {recipe.estimatedNutrition.protein}</p>
              <p><span className="font-medium text-gray-600">Karbohidrat:</span> {recipe.estimatedNutrition.carbs}</p>
              <p><span className="font-medium text-gray-600">Lemak:</span> {recipe.estimatedNutrition.fat}</p>
            </div>
          </div>


          {/* Tombol Aksi: Periksa Bahan & Mulai Memasak */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-8">
            <button
              type="button"
              className="flex-1 w-full sm:w-auto justify-center inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-colors duration-150"
              // onClick={() => {/* Logika untuk menampilkan bahan */}}
            >
              <ClipboardIcon className="w-5 h-5 mr-2 -ml-1" />
              Periksa Bahan-Bahan
            </button>
            <button
              type="button"
              className="flex-1 w-full sm:w-auto justify-center inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150"
              // onClick={() => {/* Logika untuk memulai memasak (navigasi ke halaman step-by-step) */}}
            >
              <PlayIcon className="w-5 h-5 mr-2 -ml-1" />
              Mulai Memasak Sekarang
            </button>
          </div>

          {/* Daftar Bahan - Sesuai dengan proposal [cite: 29] */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Bahan-Bahan</h3>
            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-600 bg-gray-50 p-4 rounded-md">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient.id}>
                  {ingredient.quantity} <strong>{ingredient.name}</strong>
                  {ingredient.notes && <span className="text-sm text-gray-500"> ({ingredient.notes})</span>}
                </li>
              ))}
            </ul>
          </div>

          {/* Langkah Memasak - Sesuai dengan proposal [cite: 32] */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Langkah Memasak</h3>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction) => (
                <li key={instruction.step} className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white font-bold rounded-full flex items-center justify-center mr-4">{instruction.step}</span>
                  <p className="text-gray-700 leading-relaxed pt-1">{instruction.description}</p>
                </li>
              ))}
            </ol>
          </div>

        </div>
      </div>
    </div>
  );
}