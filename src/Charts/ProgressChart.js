// ProgressChart.js
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ProgressChart = ({ progress }) => {
  const options = {
    chart: {
      type: 'radialBar',
      height: 150,
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: '60%',
          background: '#fff',
        },
        dataLabels: {
          showOn: 'always',
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '13px',
          },
          value: {
            color: '#111',
            fontSize: '20px',
            show: true,
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91],
      },
    },
    series: [progress],
    labels: ['Progress'],
  };

  return <ReactApexChart options={options} series={options.series} type="radialBar" height={200} />;
};

export default ProgressChart;