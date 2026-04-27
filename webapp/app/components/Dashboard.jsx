import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export const Dashboard = () => {
  const barChartRef = useRef(null)
  const pieChartRef = useRef(null)
  const scatterChartRef = useRef(null)

  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
  ];

  useEffect(() => {
    const ctx = document.getElementById('barChart')
    if (ctx) {
      if (barChartRef.current) {
        barChartRef.current.destroy()
      }
      barChartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(row => row.year),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: data.map(row => row.count),
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 205, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(201, 203, 207, 0.6)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ]
            }
          ]
        },
        options: {}
      })
    }
    return () => {
      if (barChartRef.current) {
        barChartRef.current.destroy()
      }
    }
  }, [])

  useEffect(() => {
    const ctx = document.getElementById('pieChart')
    if (ctx) {
      if (pieChartRef.current) {
        pieChartRef.current.destroy()
      }
      pieChartRef.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: [
            'Red',
            'Blue',
            'Yellow'
          ],
          datasets: [{
            label: 'Interaction by',
            data: [300, 50, 100],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
          }]
        },
        options: {}
      })
    }
    return () => {
      if (pieChartRef.current) {
        pieChartRef.current.destroy()
      }
    }
  }, [])

  useEffect(() => {
    const ctx = document.getElementById('scatterChart')
    if (ctx) {
      if (scatterChartRef.current) {
        scatterChartRef.current.destroy()
      }
      scatterChartRef.current = new Chart(ctx, {
        type: 'scatter',
        data: {
          labels: data.map(row => row.year),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: data.map(row => row.count)
            }
          ]
        },
        options: {}
      })
    }
    return () => {
      if (scatterChartRef.current) {
        scatterChartRef.current.destroy()
      }
    }
  }, [])

  return (
    <div className=" bg-gray-300 border-b border-gray-200 mt-16 flex flex-row items-center justify-evenly p-6">
      <div className="flex flex-col items-center">
        <canvas id="barChart"></canvas>
        <p className="pt-6 text-lg font-semibold">Annual Sales</p>
      </div>
      <div className="flex flex-col items-center">
        <canvas id="pieChart"></canvas>
        <p className="pt-6 text-lg font-semibold">Annual Interaction</p>
      </div>
      <div className="flex flex-col items-center">
        <canvas id="scatterChart"></canvas>
        <p className="pt-6 text-lg font-semibold">Annual Scatter</p>
      </div>
    </div>
  )
}
