import React from "react";
import Chart from 'react-apexcharts';


const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#00D9E9', '#FF66C3', '#6A0572'];

const BarChart = () => {
  const options = {
    series: [{
      data: [21, 22, 10],
    }],
    chart: {
      height: 350,
      type: 'bar',
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [
        ['OOP'],
        ['Concurrent','Programming'],
        ['Opp', 'Developement'],
      ],
      labels: {
        style: {
          colors: colors,
          fontSize: '12px',
        },
      },
    },
  };

  return (
    <div id="chart">
      <Chart options={options} series={options.series} type="bar" height={350} />
    </div>
  );
};

export default BarChart;