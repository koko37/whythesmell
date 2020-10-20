import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { DISPLAY_WEEKLY, DISPLAY_DAILY } from '../utils/constants'
import { getWeekDayTwo } from '../utils/utils'

const SmellGraph = ({peeData, pooData, smellData, startDate, endDate, graphMode}) => {
  const [xLabels, setXlabels] = useState([])
  const [peeValues, setPeeValues] = useState([])
  const [pooValues, setPooValues] = useState([])
  const [smellValues, setSmellValues] = useState([])

  useEffect(() => {
    // prepare xAxis
    let xLabelsTemp
    let peeValuesTemp = []
    let pooValuesTemp = []
    let smellValuesTemp = []
    let i

    if (graphMode === DISPLAY_WEEKLY) {
      xLabelsTemp = get7DaysXaxisLabel(startDate, endDate)
      console.log('x label count 2:', xLabelsTemp.length)
    } else {
      xLabelsTemp = get24HoursXaxisLabel(startDate)
      console.log('x label count:', xLabelsTemp.length)
    }
    for(i=0; i<xLabelsTemp.length; i++) {
      peeValuesTemp.push(0)
      pooValuesTemp.push(0)
      smellValuesTemp.push(0)
    }

    if (graphMode === DISPLAY_DAILY) {
      getYvalues(startDate, endDate, peeData, peeValuesTemp)
      getYvalues(startDate, endDate, pooData, pooValuesTemp)
      getYvalues(startDate, endDate, smellData, smellValuesTemp)
    } else {
      const endDateNext = new Date(endDate)
      endDateNext.setDate(endDateNext.getDate()+1)
      getYvalues(startDate, endDateNext, peeData, peeValuesTemp)
      getYvalues(startDate, endDateNext, pooData, pooValuesTemp)
      getYvalues(startDate, endDateNext, smellData, smellValuesTemp)
    }

    setXlabels(xLabelsTemp)
    setPeeValues(peeValuesTemp)
    setPooValues(pooValuesTemp)
    setSmellValues(smellValuesTemp)

  }, [graphMode, startDate, endDate, peeData, pooData, smellData])

  /**
   * generate y values
   */
  const getYvalues = (beDate, enDate, originalData, holdArray) => {
    // console.log("start date:", beDate.toLocaleString())
    // console.log("end date:", enDate.toLocaleString())
    // console.log("holdArray:", holdArray.length)

    const startTimestamp = beDate.valueOf()
    const endTimestamp = enDate.valueOf()
    const dts = (endTimestamp - startTimestamp) / holdArray.length
    originalData.forEach((item) => {
      let ts = parseInt(item.createdAt)
      let index = parseInt((ts - startTimestamp) / dts)
      holdArray[index] = parseInt(item.value)
    })
  }

  /**
   * X-Axis label generators
   */
  const get24HoursXaxisLabel = (beDate) => {
    const xNewLabel = []
    let i
    xNewLabel.push([`${beDate.getDate()}`, `${getWeekDayTwo(beDate)}`])
    for(i=1; i<12; i++) {
      if (i%2 ===1) {
        xNewLabel.push('')
      } else {
        xNewLabel.push(`${i}am`)
      }
    }
    xNewLabel.push('12pm')
    for(i=1; i<12; i++) {
      if (i%2 ===1) {
        xNewLabel.push('')
      } else {
        xNewLabel.push(`${i}pm`)
      }
    }
    const nextDate = new Date(beDate)
    nextDate.setDate(nextDate.getDate()+1)
    xNewLabel.push([`${nextDate.getDate()}`,`${getWeekDayTwo(nextDate)}`])
    return xNewLabel
  }

  const get7DaysXaxisLabel = (beDate, enDate) => {
    const xNewLabel = []
    let tempDate = new Date(beDate)
    let i
    while(tempDate <= enDate) {
      xNewLabel.push([`${tempDate.getDate()}`, `${getWeekDayTwo(tempDate)}`])
      for (i=1; i<24; i++) {
        xNewLabel.push('')
      }
      tempDate.setDate(tempDate.getDate()+1)
    }
    xNewLabel.push([`${tempDate.getDate()}`, `${getWeekDayTwo(tempDate)}`])

    return xNewLabel
  }

  return(
    <Bar
      data={{
        datasets: [
          {
            label: 'Smell',
            type:'line',
            data: smellValues,
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
            data: peeValues,
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
            data: pooValues,
            fill: false,
            backgroundColor: '#CD8A4E',
            borderColor: '#CD8A4E',
            hoverBackgroundColor: '#CD8A4E',
            hoverBorderColor: '#CD8A4E',
            yAxisID: 'y-axis-1'
          }
        ]
      }}
      options={{
        responsive: true,
        tooltips: {
          mode: 'label'
        },
        elements: {
          line: {
            tension: 0,
            fill: false,
          },
          point: {
            radius: 0
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
              labels: xLabels,
              ticks: {
                fontColor: 'white',
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
                fontColor: 'white',
                suggestedMin: 0,
                suggestedMax: 10,
                beginAtZero: true,
              }
            },
          ]
        }
      }}
    />
  )
}

export default SmellGraph
