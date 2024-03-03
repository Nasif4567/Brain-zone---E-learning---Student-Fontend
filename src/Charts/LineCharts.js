import React from 'react';
import Chart from 'react-apexcharts';

const LineChart = () => {
  // Sample data for the chart
  const series = [
    {
      name: 'Series 1',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
  ];

  const options = {
    chart: {
      height: 200,
      type: 'line',
    },
    xaxis: {
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
      ],
    },
  };

  return (
    <Chart options={options} series={series} type="line" height={200} width={600} />
  );
};

export default LineChart;
