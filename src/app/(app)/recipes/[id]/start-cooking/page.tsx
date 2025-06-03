'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { LightBulbIcon } from '@heroicons/react/24/outline';
import * as React from 'react';

import { supabase } from '@/lib/supabaseClient';

type InstructionStep = {
  step: number;
  instruction: string;
  image_url?: string | null; // optional, karena di data Anda tidak ada
};


type Recipe = {
  recipe_id: number;
  title: string;
  image_url: string | null;
  step: InstructionStep[];
};

export default function StartCookingPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params Promise using React.use()
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;

  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    async function fetchRecipe() {
      setLoading(true);
      setError(null);
  
      const { data, error } = await supabase
        .from('recipes')
        .select('recipe_id, title, image_url, step')
        .eq('recipe_id', Number(id))
        .single();
  
      if (error) {
        setError('Gagal memuat data resep.');
        setRecipe(null);
      } else if (data) {
        let steps: InstructionStep[] = [];
        try {
          steps = Array.isArray(data.step) ? data.step : JSON.parse(data.step);
        } catch {
          steps = [];
        }
  
        setRecipe({
          recipe_id: data.recipe_id,
          title: data.title,
          image_url: data.image_url || '/images/placeholder-nasgor.jpg',
          step: steps,
        });
      }
      setLoading(false);
    }
  
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p>Memuat data resep...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 text-center text-red-600">
        <p>{error}</p>
        <Link href={`/recipes/${id}`} className="mt-4 inline-block text-green-600 hover:underline">
          Kembali ke Detail Resep
        </Link>
      </div>
    );
  }

  if (!recipe || !recipe.step || recipe.step.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p>Informasi langkah memasak tidak ditemukan untuk resep ini.</p>
        <Link href={`/recipes/${id}`} className="mt-4 inline-block text-green-600 hover:underline">
          Kembali ke Detail Resep
        </Link>
      </div>
    );
  }

  const currentInstruction = recipe.step[currentStepIndex];
  const totalSteps = recipe.step.length;
  const isLastStep = currentStepIndex === totalSteps - 1;

  const goToNextStep = () => {
    if (!isLastStep) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      router.push(`/recipes/${id}/finished`);
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const stepImage = currentInstruction.image_url || recipe.image_url;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-green-700 truncate" title={recipe.title}>
            {recipe.title}
          </h1>
          <Link href={`/recipes/${id}`} className="text-sm text-gray-600 hover:text-green-700 flex items-center">
            <ArrowLeftIcon className="w-4 h-4 mr-1" /> Batal & Kembali
          </Link>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center">
        <div className="bg-white shadow-2xl rounded-xl overflow-hidden w-full max-w-2xl">
        import Image from 'next/image';

        {/* Gambar Resep */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full">
          <img
            src={recipe.image_url || '/images/default.jpg'}
            alt={recipe.title || 'Gambar resep'}
            style={{ objectFit: 'cover' }}
            className="object-cover w-full h-full"
          />
        </div>


          <div className="p-6 md:p-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-1">
              Langkah {currentInstruction.step}
            </h2>
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg mt-2 mb-6 min-h-[6em]">
              {currentInstruction.instruction}
            </p>

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

        {isLastStep && (
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 max-w-2xl w-full flex items-start">
            <LightBulbIcon className="w-8 h-8 mr-3 flex-shrink-0 text-yellow-400" />
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
