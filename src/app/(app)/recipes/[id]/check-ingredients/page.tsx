'use client'; // Diperlukan karena kita akan menggunakan useState

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid'; // Menggunakan ikon solid untuk tampilan yang lebih jelas
import { DocumentTextIcon } from '@heroicons/react/24/outline';


// Mock data untuk satu resep detail (sama seperti di halaman single recipe)
// Nantinya, data ini akan diambil berdasarkan params.id
const recipeDetail = {
  id: '1',
  title: "Nasi Goreng Spesial Keluarga",
  // deskripsi dan info lain tidak terlalu relevan di sini, tapi ID dan title penting
  ingredients: [
    { id: 'i1', name: "Nasi putih dingin", quantity: "2 piring", notes: "" },
    { id: 'i2', name: "Bawang putih", quantity: "3 siung", notes: "cincang halus" },
    { id: 'i3', name: "Bawang merah", quantity: "2 buah", notes: "iris tipis" },
    { id: 'i4', name: "Telur ayam", quantity: "2 butir", notes: "" },
    { id: 'i5', name: "Dada ayam fillet", quantity: "100 gram", notes: "potong dadu" },
    { id: 'i6', name: "Udang kupas", quantity: "50 gram", notes: "" },
    { id: 'i7', name: "Kecap manis", quantity: "2 sdm", notes: "" },
    { id: 'i8', name: "Saus tiram", quantity: "1 sdm", notes: "" },
    { id: 'i9', name: "Garam & Merica", quantity: "secukupnya", notes: "" },
    { id: 'i10', name: "Daun bawang", quantity: "1 batang", notes: "iris untuk taburan" },
    { id: 'i11', name: "Minyak goreng", quantity: "2 sdm", notes: "" },
  ],
  // ... sisa data resep
};

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  notes?: string;
}

export default function CheckIngredientsPage({ params }: { params: { id: string } }) {
  // Di aplikasi nyata, Anda akan menggunakan params.id untuk mengambil data resep
  // const recipe = await fetchRecipeById(params.id);
  const recipe = recipeDetail; // Menggunakan mock data

  // State untuk melacak bahan mana yang sudah dicentang
  // Inisialisasi semua bahan sebagai belum dicentang
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Inisialisasi state ketika data resep tersedia (atau berubah)
    const initialChecks: Record<string, boolean> = {};
    recipe.ingredients.forEach(ingredient => {
      initialChecks[ingredient.id] = false;
    });
    setCheckedIngredients(initialChecks);
  }, [recipe.ingredients]);


  const handleCheckboxChange = (ingredientId: string) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [ingredientId]: !prev[ingredientId],
    }));
  };

  const allIngredientsChecked = recipe.ingredients.every(ing => checkedIngredients[ing.id]);

  if (!recipe) {
    return <div className="container mx-auto p-8 text-center">Recipe not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <Link href={`/recipes/${params.id}`} className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors duration-150 group">
          <ArrowLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-150" />
          Kembali ke Detail Resep
        </Link>
      </div>

      <div className="bg-white shadow-xl rounded-lg p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-4 border-b border-gray-200">
          <div>
            <p className="text-sm text-gray-500">Checklist Bahan untuk:</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {recipe.title}
            </h1>
          </div>
          {allIngredientsChecked && (
            <div className="mt-3 sm:mt-0 flex items-center text-green-600 bg-green-100 px-3 py-2 rounded-md">
              <CheckCircleIcon className="w-6 h-6 mr-2"/>
              <span className="font-semibold">Semua bahan siap!</span>
            </div>
          )}
        </div>
        
        <p className="text-gray-600 mb-6">
          Gunakan daftar ini untuk memastikan semua bahan yang Anda butuhkan sudah siap sebelum mulai memasak.
        </p>

        {recipe.ingredients.length > 0 ? (
          <ul className="space-y-3">
            {recipe.ingredients.map((ingredient: Ingredient) => (
              <li
                key={ingredient.id}
                className={`p-4 border rounded-lg transition-all duration-200 ease-in-out flex items-start space-x-3
                  ${checkedIngredients[ingredient.id] ? 'bg-green-50 border-green-300 shadow-sm' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
              >
                <input
                  type="checkbox"
                  id={`ingredient-${ingredient.id}`}
                  checked={!!checkedIngredients[ingredient.id]}
                  onChange={() => handleCheckboxChange(ingredient.id)}
                  className="mt-1 h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer flex-shrink-0"
                />
                <label htmlFor={`ingredient-${ingredient.id}`} className="flex-grow cursor-pointer">
                  <span className={`block font-medium ${checkedIngredients[ingredient.id] ? 'text-green-700 line-through' : 'text-gray-800'}`}>
                    {ingredient.quantity} {ingredient.name}
                  </span>
                  {ingredient.notes && (
                    <span className={`block text-sm ${checkedIngredients[ingredient.id] ? 'text-green-600 line-through' : 'text-gray-500'}`}>
                      ({ingredient.notes})
                    </span>
                  )}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-10">
            <DocumentTextIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Tidak ada daftar bahan untuk resep ini.</p>
          </div>
        )}

        {recipe.ingredients.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                 <button
                    onClick={() => {
                        const allChecked = recipe.ingredients.every(ing => checkedIngredients[ing.id]);
                        const newChecks: Record<string, boolean> = {};
                        recipe.ingredients.forEach(ing => {
                            newChecks[ing.id] = !allChecked;
                        });
                        setCheckedIngredients(newChecks);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {recipe.ingredients.every(ing => checkedIngredients[ing.id]) ? 'Batal Centang Semua' : 'Centang Semua'}
                </button>
                <Link
                    href={`/recipes/${params.id}/start-cooking`} // Asumsi halaman start cooking
                    className={`px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center
                        ${allIngredientsChecked ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' : 'bg-gray-400 cursor-not-allowed'}`}
                    aria-disabled={!allIngredientsChecked}
                    onClick={(e) => { if (!allIngredientsChecked) e.preventDefault(); }}
                >
                    <PlayIcon className="w-5 h-5 mr-2 -ml-1" />
                    Siap Memasak!
                </Link>
            </div>
        )}
      </div>
    </div>
  );
}

// Placeholder untuk ikon jika @heroicons/react tidak diinstall
// const IconPlaceholder = ({ className }: { className?: string }) => <div className={`w-6 h-6 bg-gray-300 rounded ${className}`} />;

// Jika menggunakan PlayIcon dari Heroicons, import seperti ini:
import { PlayIcon } from '@heroicons/react/24/solid';