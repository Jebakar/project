import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip);

const SalesAnalyticsChart = () => {
  const data = {
    labels: Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0')),
    datasets: [
      {
        label: 'Orders',
        data: [0.1, 0.5, 1.1, 1.2, 1.3, 1.1, 1.6, 1.9, 2.1, 2.4, 2.2, 2.0, 1.5, 1.1, 0.8, 1.4, 1.9, 2.0, 2.2, 2.3, 1.9, 1.6, 1.3, 1.1, 1.0, 0.7, 0.4, 0.3, 0.2, 0.5, 0.9],
        borderColor: 'rgb(159,213,241)',
        backgroundColor: 'rgba(159,213,241,0.3)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Customers',
        data: [0.2, 0.6, 1.0, 1.3, 1.5, 1.2, 1.7, 2.0, 2.3, 2.5, 2.3, 2.1, 1.7, 1.2, 1.0, 1.5, 2.1, 2.3, 2.5, 2.4, 2.1, 1.8, 1.5, 1.3, 1.1, 0.8, 0.6, 0.4, 0.3, 0.6, 1.0],
        borderColor: 'rgb(16,101,210)',
        backgroundColor: 'rgba(16,101,210,0.3)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 0.5,
        },
      },
    },
  };

  return (
    <div style={{ height: 260 }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesAnalyticsChart;
