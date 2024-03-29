import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styles from './Charts.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const Chart = ({ data, country }) => {
  const barChart = data.cases ? (
    <Bar
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'People',
            backgroundColor: [
              'rgba(0, 0, 255, 0.5)',
              'rgba(0, 255, 0, 0.5)',
              'rgba(255, 0, 0, 0.5)',
            ],
            data: [data.cases, data.recovered, data.deaths],
          },
        ],
      }}
      options={
        {
          // legend: { display: false },
          // title: { display: true, text: `Current state in ${country}` },
        }
      }
    />
  ) : null;
  return <div className={styles.container}>{barChart}</div>;
};
export default Chart;
