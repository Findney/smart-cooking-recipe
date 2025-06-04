import { ScaleIcon } from '@heroicons/react/24/solid';
import MacroChart from '@/app/(app)/nutrition-tracker/MacroChart.client';

export default function MacroBreakdown({ macros }: { macros: { carbs: number, protein: number, fat: number } }) {
    return (
        <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
                <ScaleIcon className="w-7 h-7 mr-2 text-green-600" />
                Macronutrients details
            </h2>
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg h-80 sm:h-96">
                <MacroChart macroData={macros} />
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-blue-100 rounded-lg shadow">
                    <p className="text-sm font-medium text-blue-700">Carbohidrate</p>
                    <p className="text-xl font-bold text-blue-800">{macros.carbs}g</p>
                </div>
                <div className="p-3 bg-red-100 rounded-lg shadow">
                    <p className="text-sm font-medium text-red-700">Protein</p>
                    <p className="text-xl font-bold text-red-800">{macros.protein}g</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg shadow">
                    <p className="text-sm font-medium text-yellow-700">Fat</p>
                    <p className="text-xl font-bold text-yellow-800">{macros.fat}g</p>
                </div>
            </div>
        </section>
    );
}
