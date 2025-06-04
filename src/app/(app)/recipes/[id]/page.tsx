import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import {
  ClockIcon,
  ScaleIcon,
  ClipboardIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default async function SingleRecipePage(props: { params: Promise<{ id: string }> }) {
  // Tunggu params yang berupa Promise
  const params = await props.params;

  const recipeId = Number(params.id);

  if (isNaN(recipeId)) {
    return (
      <div className="container mx-auto p-8 text-center text-red-500 font-semibold">
        ID Resep tidak valid.
      </div>
    );
  }


  const { data: recipe, error: recipeError } = await supabase
    .from('recipes')
    .select('*')
    .eq('recipe_id', recipeId)
    .single();

  if (recipeError || !recipe) {
    return (
      <div className="container mx-auto p-8 text-center text-red-500 font-semibold">
        Resep tidak ditemukan.
      </div>
    );
  }

  const { data: ingredients } = await supabase
    .from('recipe_ingredients')
    .select(`
      quantity,
      ingredients (
        name,
        unit
      )
    `)
    .eq('recipe_id', recipeId);

  const instructions = Array.isArray(recipe.step)
    ? recipe.step
    : JSON.parse(recipe.step || '[]');

  const totalCookTime = recipe.cooking_time;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Gambar Resep */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full">
          <img
            src={recipe.image_url || '/images/default.jpg'}
            alt={recipe.title}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="p-6 md:p-8">
          {/* Judul */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {recipe.title}
          </h1>

          {/* Deskripsi */}
          <p className="text-gray-600 text-justify text-lg mb-6">
            {recipe.description}
          </p>

          {/* Total Waktu */}
          <div className="mb-8 p-4 bg-green-50 rounded-lg max-w-[160px]">
            <div className="flex items-center space-x-2">
              <ClockIcon className="w-7 h-7 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Total Waktu</p>
                <p className="font-medium text-gray-700">{totalCookTime} menit</p>
              </div>
            </div>
          </div>

          {/* Estimasi Nutrisi */}
          <div className="text-black mb-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
              <ScaleIcon className="w-6 h-6 text-blue-600 mr-2" />
              Estimasi Fakta Nutrisi
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <p><span className="font-medium text-gray-600">Kalori:</span> {recipe.calory} kcal</p>
              <p><span className="font-medium text-gray-600">Protein:</span> {recipe.protein} g</p>
              <p><span className="font-medium text-gray-600">Karbohidrat:</span> {recipe.carbs} g</p>
              <p><span className="font-medium text-gray-600">Lemak:</span> {recipe.fat} g</p>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-8">
            <Link
              href={`/recipes/${recipeId}/check-ingredients`}
              className="flex-1 justify-center inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-colors duration-150 text-center"
            >
              <ClipboardIcon className="w-5 h-5 mr-2 -ml-1" />
              Periksa Bahan-Bahan
            </Link>

            <Link
              href={`/recipes/${recipeId}/start-cooking`}
              className="flex-1 justify-center inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150 text-center"
            >
              <PlayIcon className="w-5 h-5 mr-2 -ml-1" />
              Mulai Memasak Sekarang
            </Link>
          </div>

          {/* Bahan-Bahan */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Bahan-Bahan</h3>
            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-600 bg-gray-50 p-4 rounded-md">
              {ingredients?.map((item, index) => (
                <li key={index}>
                  {item.quantity} {item.ingredients.unit}{' '}
                  <strong>{item.ingredients.name}</strong>
                </li>
              ))}
            </ul>
          </div>

          {/* Langkah Memasak */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Langkah Memasak</h3>
            <ol className="space-y-4">
              {instructions.map((instruction: any, idx: number) => (
                <li key={idx} className="flex items-start">
                  <span className="w-8 h-8 bg-green-600 text-white font-bold rounded-full flex items-center justify-center mr-4">
                    {instruction.step || idx + 1}
                  </span>
                  <p className="text-gray-700 leading-relaxed pt-1">
                    {instruction.instruction || instruction.description || 'Langkah belum tersedia.'}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
