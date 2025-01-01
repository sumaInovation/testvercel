import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement,ChartDataLabels);

const Invoice = ({Linedata,Piedata,Tabledata}) => {
  // Data for the Line Chart (Daily Production)
  const lineData = {
    labels: Object.keys(Linedata),
    datasets: [
      {
        label: 'Daily Production',
        data: Object.values(Linedata),  // Example data
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      
    ]
  };
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Machine Status Over Time',
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Cable Length(M)',
        },
      },
    },
  };
  

  // Data for the Pie Chart (Downtime vs Running Time)
  const pieData = {
    labels: Object.keys(Piedata),
    datasets: [
      {
        data: Object.values(Piedata),  // Example data: % distribution of time
        backgroundColor: [
          '#36A2EB',  // Blue
          '#FF6384',  // Red
          '#FF9F40',  // Orange
          '#FFCD56',  // Yellow
          '#4BC0C0',  // Teal
          '#9966FF',  // Purple
          '#FFB6B9',  // Pink
          '#C9CBCF'   // Gray
        ],
        hoverOffset: 4
      }
    ]
  };

  const options1 = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw} units`;
          },
        },
      },
      datalabels: {
        color: '#fff', // Text color for the data labels
        formatter: (value, context) => {
          // Calculate percentage
          const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
          const percentage = ((value / total) * 100).toFixed(2);
          return `${percentage}%`; // Display percentage
        },
        font: {
          weight: 'bold', // Bold font for the labels
        },
      },
    },
  };
  


  
  return (
    <>
    <div className="container mx-auto p-8 text-white  bg-gray-900">
      <h1 className="lg:text-3xl text-xl font-bold text-center mb-8 ">Analysis Report</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Line Chart */}
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">Daily Production</h3>
          <div className="w-96 h-96">
            <Line data={lineData} options={options} />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">Running Time vs Downtime</h3>
          <div className="w-80 h-80">
            <Pie data={pieData}  options={options1}/>
          </div>
        </div>
      </div>
      <div className='lg:flex'>
      {/* Table */}
      <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Machine Performance Report</h2>
      <table border="1">
        <thead>
          <tr>
          <th style={{ border: '1px solid black', padding: '8px' }}>Date</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Runtime(Min)</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Downtime(Min)</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Effiecncy(%)</th>
          </tr>
        </thead>
        <tbody>
          {/* Render each row from the data array */}
          {Tabledata.map((entry, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{entry[0]}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{entry[1]}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{entry[2]}</td>
               <td style={{ border: '1px solid black', padding: '8px' }}>{
               
                   ((parseInt(entry[1],10)/(parseInt(entry[1],10)+parseInt(entry[2],10)))*100).toFixed(2)
               
               }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
     <div className='text-white'>
      <p>This Report Genarate by sysytem not signature requied</p>
     </div>
     </div>
     
    </div>
     <div className='h-[300px]'>
     
     </div>
    </>
  );
};

export default Invoice;
