'use client'; // Diperlukan karena kita akan menggunakan useState dan useRouter

import { useState }
from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Untuk navigasi setelah "Finish"
import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { LightBulbIcon } from '@heroicons/react/24/outline';


// Mock data untuk satu resep detail (sama seperti sebelumnya)
// Nantinya, data ini akan diambil berdasarkan params.id
const recipeDetail = {
  id: '1',
  title: "Nasi Goreng Spesial Keluarga",
  imageUrl: "/images/placeholder-nasgor.jpg", // Gambar utama resep
  instructions: [
    { step: 1, description: "Panaskan minyak goreng dalam wajan atau penggorengan dengan api sedang. Setelah minyak panas, buat telur orak-arik hingga matang. Angkat telur dan sisihkan sementara.", image_url: "/images/step-nasgor-1.jpg" }, // Contoh gambar per langkah
    { step: 2, description: "Gunakan wajan yang sama, tambahkan sedikit minyak jika perlu. Tumis bawang putih cincang dan irisan bawang merah hingga harum dan sedikit layu, sekitar 1-2 menit.", image_url: "/images/step-nasgor-2.jpg" },
    { step: 3, description: "Masukkan potongan dada ayam fillet dan udang kupas ke dalam wajan. Masak sambil diaduk hingga ayam matang dan udang berubah warna menjadi kemerahan.", image_url: "/images/step-nasgor-3.jpg" },
    { step: 4, description: "Masukkan 2 piring nasi putih dingin. Aduk rata dengan bumbu dan bahan lainnya. Pastikan tidak ada nasi yang menggumpal. Tekan-tekan nasi dengan spatula untuk memisahkannya.", image_url: "/images/step-nasgor-4.jpg" },
    { step: 5, description: "Tuangkan kecap manis dan saus tiram. Bumbui dengan garam dan merica secukupnya. Aduk kembali hingga semua bumbu tercampur rata dan nasi berwarna cokelat merata serta sedikit kering.", image_url: "/images/step-nasgor-5.jpg" },
    { step: 6, description: "Masukkan kembali telur orak-arik yang sudah disisihkan. Aduk sebentar hingga tercampur dengan nasi. Koreksi rasa, tambahkan bumbu jika perlu.", image_url: "/images/step-nasgor-6.jpg" },
    { step: 7, description: "Angkat Nasi Goreng Spesial dan sajikan selagi hangat. Taburi dengan irisan daun bawang dan bawang goreng. Lengkapi dengan acar timun wortel dan kerupuk udang jika suka.", image_url: "/images/placeholder-nasgor.jpg" }, // Gambar final bisa sama dengan gambar utama
  ],
  // ... sisa data resep
};

export default function StartCookingPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  // Di aplikasi nyata, Anda akan menggunakan params.id untuk mengambil data resep
  // const recipe = await fetchRecipeById(params.id);
  const recipe = recipeDetail; // Menggunakan mock data

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!recipe || !recipe.instructions || recipe.instructions.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p>Informasi langkah memasak tidak ditemukan untuk resep ini.</p>
        <Link href={`/recipes/${params.id}`} className="mt-4 inline-block text-green-600 hover:underline">
          Kembali ke Detail Resep
        </Link>
      </div>
    );
  }

  const currentInstruction = recipe.instructions[currentStepIndex];
  const totalSteps = recipe.instructions.length;
  const isLastStep = currentStepIndex === totalSteps - 1;

  const goToNextStep = () => {
    if (!isLastStep) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Aksi saat tombol "Finish" ditekan
      router.push(`/recipes/${params.id}/finished`); // <-- UBAH BARIS INI
    }
  };


  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };
  
  // Fallback ke gambar utama resep jika gambar langkah spesifik tidak ada
  const stepImage = currentInstruction.image_url || recipe.imageUrl;


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header Sederhana untuk Konteks Resep */}
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-green-700 truncate" title={recipe.title}>
            {recipe.title}
          </h1>
          <Link href={`/recipes/${params.id}`} className="text-sm text-gray-600 hover:text-green-700 flex items-center">
            <ArrowLeftIcon className="w-4 h-4 mr-1" /> Batal & Kembali
          </Link>
        </div>
      </header>

      {/* Konten Utama Langkah Memasak */}
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center">
        <div className="bg-white shadow-2xl rounded-xl overflow-hidden w-full max-w-2xl">
          {/* Gambar Langkah */}
          <div className="relative h-56 sm:h-72 md:h-80 w-full bg-gray-200">
            <Image
              src={stepImage}
              alt={`Step ${currentInstruction.step}: ${recipe.title}`}
              layout="fill"
              objectFit="cover"
              className="transition-opacity duration-500 ease-in-out opacity-0" // Efek fade-in sederhana
              onLoadingComplete={(image) => image.classList.remove('opacity-0')}
            />
            {/* Indikator Langkah */}
            <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white text-sm font-semibold px-3 py-1 rounded-full">
              Langkah {currentInstruction.step} dari {totalSteps}
            </div>
          </div>

          {/* Deskripsi Langkah */}
          <div className="p-6 md:p-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-1">
              Langkah {currentInstruction.step}
            </h2>
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg mt-2 mb-6 min-h-[6em]"> {/* Memberi tinggi minimum untuk konsistensi */}
              {currentInstruction.description}
            </p>

            {/* Navigasi Langkah */}
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
              <button
                onClick={goToPreviousStep}
                disabled={currentStepIndex === 0}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Sebelumnya
              </button>
              <button
                onClick={goToNextStep}
                className={`w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors
                  ${isLastStep 
                    ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' 
                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'}`}
              >
                {isLastStep ? 'Selesai Memasak' : 'Berikutnya'}
                {isLastStep ? <CheckCircleIcon className="w-5 h-5 ml-2" /> : <ArrowRightIcon className="w-5 h-5 ml-2" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Tips atau Info Tambahan (Contoh) */}
        {isLastStep && (
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 max-w-2xl w-full flex items-start">
                <LightBulbIcon className="w-8 h-8 mr-3 flex-shrink-0 text-yellow-400"/>
                <div>
                    <h4 className="font-semibold">Selamat! Anda telah menyelesaikan resep ini.</h4>
                    <p className="text-sm">Jangan lupa untuk membersihkan peralatan masak Anda dan nikmati hidangan lezat yang telah Anda buat!</p>
                </div>
            </div>
        )}
      </main>
    </div>
  );
}