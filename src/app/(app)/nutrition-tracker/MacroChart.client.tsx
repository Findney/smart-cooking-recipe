'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MacroChartProps {
  macroData: {
    carbs: number;
    protein: number;
    fat: number;
  };
}

const MacroChart: React.FC<MacroChartProps> = ({ macroData }) => {
  const data: ChartData<'bar'> = {
    labels: ['Karbohidrat (g)', 'Protein (g)', 'Lemak (g)'],
    datasets: [
      {
        label: 'Makronutrien Harian',
        data: [macroData.carbs, macroData.protein, macroData.fat],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)', // Biru untuk Karbo
          'rgba(255, 99, 132, 0.6)', // Merah untuk Protein
          'rgba(255, 206, 86, 0.6)', // Kuning untuk Lemak
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Sembunyikan legenda jika hanya ada satu dataset
      },
      title: {
        display: true,
        text: 'Distribusi Makronutrien Harian (gram)',
        font: {
            size: 16,
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
            display: true,
            text: 'Gram (g)'
        }
      },
    },
  };

  return <Bar options={options} data={data} />;
};

export default MacroChart;