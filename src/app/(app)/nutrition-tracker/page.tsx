import Link from 'next/link';
import { FireIcon, ScaleIcon, Squares2X2Icon, CalendarIcon } from '@heroicons/react/24/solid';
import MacroChart from './MacroChart.client'; // Impor client component

// Mock data untuk nutrisi harian
const dailyNutritionData = {
  date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
  totalCalories: 2150,
  macros: {
    carbs: 250, // gram
    protein: 130, // gram
    fat: 70,    // gram
  },
  meals: [
    {
      id: 'meal1',
      recipeId: '1', // Contoh link ke resep
      name: "Nasi Goreng Spesial Keluarga",
      time: "Makan Siang",
      calories: 650,
      macros: { carbs: 80, protein: 30, fat: 22 },
      imageUrl: "/images/placeholder-nasgor.jpg",
    },
    {
      id: 'meal2',
      recipeId: '3',
      name: "Capcay Kuah Seafood",
      time: "Makan Malam",
      calories: 450,
      macros: { carbs: 40, protein: 35, fat: 18 },
      imageUrl: "/images/placeholder-capcay.jpg",
    },
    {
      id: 'meal3',
      name: "Overnight Oats dengan Buah Berry", // Makanan custom
      time: "Sarapan",
      calories: 550,
      macros: { carbs: 80, protein: 30, fat: 15 },
      imageUrl: "/images/placeholder-oats.jpg", // Sediakan gambar placeholder
    },
    {
      id: 'meal4',
      name: "Smoothie Protein Pisang Coklat",
      time: "Cemilan",
      calories: 500,
      macros: { carbs: 50, protein: 35, fat: 15 },
      imageUrl: "/images/placeholder-smoothie.jpg", // Sediakan gambar placeholder
    }
  ],
};

export default function NutritionTrackerPage() {
  const { date, totalCalories, macros, meals } = dailyNutritionData;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Pelacak Nutrisi Harian</h1>
          <div className="flex items-center text-gray-600 mt-1">
            <CalendarIcon className="w-5 h-5 mr-2 text-green-600" />
            <span>{date}</span>
          </div>
        </div>
        {/* Tombol untuk menambah makanan/minuman bisa diletakkan di sini nantinya */}
      </div>

      {/* Ringkasan Kalori */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow-lg flex items-center justify-between">
          <div>
            <p className="text-lg opacity-90">Total Kalori Hari Ini</p>
            <p className="text-5xl font-extrabold">{totalCalories.toLocaleString('id-ID')} kcal</p>
          </div>
          <FireIcon className="w-16 h-16 opacity-50" />
        </div>
      </section>

      {/* Grafik Makronutrien */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
            <ScaleIcon className="w-7 h-7 mr-2 text-green-600" />
            Rincian Makronutrien
        </h2>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg h-80 sm:h-96"> {/* Memberi tinggi tetap untuk canvas chart */}
          <MacroChart macroData={macros} />
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-blue-100 rounded-lg shadow">
                <p className="text-sm font-medium text-blue-700">Karbohidrat</p>
                <p className="text-xl font-bold text-blue-800">{macros.carbs}g</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg shadow">
                <p className="text-sm font-medium text-red-700">Protein</p>
                <p className="text-xl font-bold text-red-800">{macros.protein}g</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg shadow">
                <p className="text-sm font-medium text-yellow-700">Lemak</p>
                <p className="text-xl font-bold text-yellow-800">{macros.fat}g</p>
            </div>
        </div>
      </section>

      {/* Daftar Makanan yang Dimasak/Dikonsumsi */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
            <Squares2X2Icon className="w-7 h-7 mr-2 text-green-600" />
            Makanan Tercatat Hari Ini
        </h2>
        {meals.length > 0 ? (
          <div className="space-y-4">
            {meals.map((meal) => (
              <div key={meal.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-start space-x-4">
                <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-md overflow-hidden bg-gray-200">
                  {meal.imageUrl && (
                    <img src={meal.imageUrl} alt={meal.name} className="w-full h-full object-cover"/>
                  )}
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800">{meal.name}</h3>
                  <p className="text-sm text-gray-500 mb-1">{meal.time}</p>
                  <p className="text-sm text-green-700 font-medium">{meal.calories} kcal</p>
                  <div className="text-xs text-gray-500 mt-1">
                    K: {meal.macros.carbs}g | P: {meal.macros.protein}g | L: {meal.macros.fat}g
                  </div>
                </div>
                {meal.recipeId && (
                  <Link href={`/recipes/${meal.recipeId}`} className="text-sm text-green-600 hover:underline self-center sm:self-end whitespace-nowrap">
                    Lihat Resep
                  </Link>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-lg shadow">
            <p className="text-gray-500">Belum ada makanan yang tercatat hari ini.</p>
            {/* Tombol untuk menambah makanan bisa diletakkan di sini */}
          </div>
        )}
      </section>
    </div>
  );
}