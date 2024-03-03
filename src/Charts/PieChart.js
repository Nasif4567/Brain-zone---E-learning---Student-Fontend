import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChart = ({data}) => {
  const option = {
    chart:{
        type:'Pie',
    },

    labels: data.labels,
  }

  const series = data.series;


  return(
    <ReactApexChart options={option} series={series} type="pie" height={300}/>
  )
}

export default PieChart;