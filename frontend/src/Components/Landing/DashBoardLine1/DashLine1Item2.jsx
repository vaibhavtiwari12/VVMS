import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';



export function App() {
  return 
}

const DashLine1Item2 = () => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );
      const options = {
        
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: false,
            text: 'Cash Paid',
          },
        },
      };
      
      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Paid To Kisan',
            data: [10,20,30,400,500,800,10],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Paid By Purchaser',
            data: [900,800,450,358,100,233,98],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
    return (
        <div>
            <Line options={options} data={data} />
        </div>
    );
}

export default DashLine1Item2;
