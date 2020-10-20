import React from 'react'
import { Bar } from 'react-chartjs-2'
import { DISPLAY_WEEKLY, DISPLAY_DAILY } from '../utils/constants'

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

const data = {
  datasets: [
    {
      label: 'Smell',
      type:'line',
      data: [0, 0, 4, 8, 0, 0, 2],
      fill: false,
      borderColor: '#e94893',
      backgroundColor: '#e94893',
      pointBorderColor: '#e94893',
      pointBackgroundColor: '#e94893',
      pointHoverBackgroundColor: '#e94893',
      pointHoverBorderColor: '#e94893',
      yAxisID: 'y-axis-1'
    },
    {
      label: 'Pee',
      type: 'bar',
      data: [0, 10, 0, 0, 10, 0, 0],
      fill: false,
      backgroundColor: '#98D4E5',
      borderColor: '#98D4E5',
      hoverBackgroundColor: '#98D4E5',
      hoverBorderColor: '#98D4E5',
      yAxisID: 'y-axis-1'
    },
    {
      label: 'Poo',
      type: 'bar',
      data: [10, 0, 0, 10, 0, 0, 10],
      fill: false,
      backgroundColor: '#CD8A4E',
      borderColor: '#CD8A4E',
      hoverBackgroundColor: '#CD8A4E',
      hoverBorderColor: '#CD8A4E',
      yAxisID: 'y-axis-1'
    }
  ]
};

const options = {
  responsive: true,
  tooltips: {
    mode: 'label'
  },
  elements: {
    line: {
      tension: 0,
      fill: false
    }
  },
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: true,
        gridLines: {
          display: false,
        },
        labels: labels,
        ticks: {
          fontColor: 'white'
        }
      }
    ],
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
        gridLines: {
          display: false
        },
        labels: {
          show: true
        },
        ticks: {
          fontColor: 'white'
        }
      },
    ]
  }
};

const SmellGraph = ({peeData, pooData, smellData, startDate, endDate, graphMode}) => {
  return(
    <Bar
      data={data}
      options={options}
    />
  )
}

export default SmellGraph
