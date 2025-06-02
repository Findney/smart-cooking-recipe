import { FireIcon } from '@heroicons/react/24/solid';

export default function CaloriesSummary({ totalCalories }: { totalCalories: number }) {
    return (
        <section className="mb-8">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow-lg flex items-center justify-between">
                <div>
                    <p className="text-lg opacity-90">Total Kalori Hari Ini</p>
                    <p className="text-5xl font-extrabold">{totalCalories.toLocaleString('id-ID')} kcal</p>
                </div>
                <FireIcon className="w-16 h-16 opacity-50" />
            </div>
        </section>
    );
}
