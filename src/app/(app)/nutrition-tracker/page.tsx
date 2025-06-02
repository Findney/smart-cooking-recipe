import HeaderSection from '@/components/nutrition/HeaderSection';
import CaloriesSummary from '@/components/nutrition/CaloriesSummary';
import MacroBreakdown from '@/components/nutrition/MacroBreakdown';
import MealList from '@/components/nutrition/MealList';
import { fetchTodayNutritionSummary } from '@/lib/fetchTodayNutritionSummary';

export default async function NutritionTrackerPage() {
  const data = await fetchTodayNutritionSummary();

  if (!data) {
    return <div className="p-10 text-center text-gray-500">Data tidak tersedia.</div>;
  }

  const { date, totalCalories, macros, meals } = data;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <HeaderSection date={date} />
      <CaloriesSummary totalCalories={totalCalories} />
      <MacroBreakdown macros={macros} />
      <MealList meals={meals} />
    </div>
  );
}
