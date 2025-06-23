import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      label: 'Users Gained',
      data: [300, 500, 200, 450, 600],
      backgroundColor: '#1e90ff',
    }
  ]
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: true },
  },
};

const Charts = () => {
  return (
    <div className="card">
      <h2>Users Growth</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Charts;
