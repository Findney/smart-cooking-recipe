'use client'; // Digunakan jika ada interaktivitas, namun untuk halaman ini mungkin tidak perlu jika hanya display & link

import Image from 'next/image';
import Link from 'next/link';
import { SparklesIcon, ClockIcon, ScaleIcon, HomeIcon, ChartBarIcon, ArrowPathIcon } from '@heroicons/react/24/solid'; // Menggunakan ikon solid

// Mock data untuk satu resep detail (sama seperti sebelumnya)
// Nantinya, data ini akan diambil berdasarkan params.id
const recipeDetail = {
  id: '1',
  title: "Nasi Goreng Spesial Keluarga",
  imageUrl: "/images/placeholder-nasgor.jpg", // Pastikan gambar ini ada di public/images
  prepTimeMinutes: 15,
  cookTimeMinutes: 20,
  servings: 2, // Tidak ditampilkan di halaman ini, tapi ada di data
  estimatedNutrition: { calories: 650, protein: "30g", carbs: "80g", fat: "22g" }
  // ... sisa data resep seperti ingredients dan instructions tidak terlalu dibutuhkan di halaman ini
};


export default function CookingFinishedPage({ params }: { params: { id: string } }) {
  // Di aplikasi nyata, Anda akan menggunakan params.id untuk mengambil data resep
  // const recipe = await fetchRecipeById(params.id);
  const recipe = recipeDetail; // Menggunakan mock data

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Resep tidak ditemukan.</h2>
        <Link href="/recipes" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Kembali ke Daftar Resep
        </Link>
      </div>
    );
  }

  const totalCookTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-4 sm:p-6 lg:p-8">
      <div className="bg-white shadow-2xl rounded-xl p-6 sm:p-10 text-center max-w-lg w-full transform transition-all hover:scale-105 duration-300">
        
        <SparklesIcon className="w-20 h-20 text-yellow-400 mx-auto mb-4 animate-pulse" />

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-3">
          Selamat!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Anda telah berhasil memasak <strong className="text-green-700">{recipe.title}</strong>!
        </p>

        <div className="relative h-48 w-full rounded-lg overflow-hidden mb-8 shadow-md">
          <Image
            src={recipe.imageUrl}
            alt={`Gambar ${recipe.title}`}
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 text-left">
          {/* Cooking Time */}
          <div className="bg-green-50 p-4 rounded-lg flex items-center space-x-3">
            <ClockIcon className="w-10 h-10 text-green-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-500">Total Waktu Memasak</p>
              <p className="text-xl font-bold text-green-700">{totalCookTime} menit</p>
            </div>
          </div>

          {/* Estimasi Kalori */}
          <div className="bg-blue-50 p-4 rounded-lg flex items-center space-x-3">
            <ScaleIcon className="w-10 h-10 text-blue-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-500">Estimasi Kalori</p>
              <p className="text-xl font-bold text-blue-700">{recipe.estimatedNutrition.calories} kcal</p>
            </div>
          </div>
        </div>
        
        {/* Info Nutrisi Tambahan */}
        <div className="mb-10 text-left bg-gray-50 p-4 rounded-lg">
            <h3 className="text-md font-semibold text-gray-700 mb-2 text-center sm:text-left">Detail Nutrisi Lainnya:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-2 text-sm text-gray-600">
                <p><span className="font-medium">Karbohidrat:</span> {recipe.estimatedNutrition.carbs}</p>
                <p><span className="font-medium">Protein:</span> {recipe.estimatedNutrition.protein}</p>
                <p><span className="font-medium">Lemak:</span> {recipe.estimatedNutrition.fat}</p>
            </div>
        </div>


        {/* Tombol Aksi */}
        <div className="space-y-4">
          <Link
            href={`/recipes/${params.id}`}
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform hover:scale-105"
          >
            <ArrowPathIcon className="w-5 h-5 mr-2" />
            Masak Resep Ini Lagi
          </Link>
          <Link
            href="/recipes"
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform hover:scale-105"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Lihat Resep Lainnya
          </Link>
          <Link
            href="/nutrition-tracker" // Pastikan halaman ini ada atau akan dibuat
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-transform hover:scale-105"
          >
            <ChartBarIcon className="w-5 h-5 mr-2" />
            Lacak Nutrisi Harian
          </Link>
        </div>
      </div>
    </div>
  );
}