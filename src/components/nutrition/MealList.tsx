import Link from 'next/link';
import { Squares2X2Icon } from '@heroicons/react/24/solid';

type Macro = { carbs: number, protein: number, fat: number };

type Meal = {
    id: string;
    recipeId?: string;
    name: string;
    category: string;
    calories: number;
    macros: Macro;
    imageUrl: string;
};

export default function MealList({ meals }: { meals: Meal[] }) {
    return (
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
                                    <img src={meal.imageUrl} alt={meal.name} className="w-full h-full object-cover" />
                                )}
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-lg font-semibold text-gray-800">{meal.name}</h3>
                                <p className="text-sm text-gray-500 mb-1">{meal.category}</p>
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
                </div>
            )}
        </section>
    );
}
