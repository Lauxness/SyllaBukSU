import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function BarChart(props) {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const labels = ["COB", "CAS", "CON", "COT", "COE", "CPAG"];
    const data = [
      props.totalCOB,
      props.totalCAS,
      props.totalCON,
      props.totalCOT,
      props.totalCOE,
      props.totalCPAG,
    ];

    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              "rgb(138, 43, 63)",
              "rgb(7, 104, 168)",
              "rgb(178, 145, 61)",
              "rgb(26, 105, 105)",
            ],
            borderWidth: 0,
            borderRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              color: "rgba(255, 255, 255, 0.04)",
            },
            ticks: {
              color: "white",
            },
          },
          y: {
            grid: {
              color: "rgba(255, 255, 255, 0.04)",
            },
            ticks: {
              color: "white",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
            labels: {
              color: "white",
              padding: 20,
            },
          },
        },
      },
    });

    return () => chartInstanceRef.current.destroy();
  }, [
    props.totalCOB,
    props.totalCAS,
    props.totalCON,
    props.totalCOT,
    props.totalCOE,
    props.totalCPAG,
  ]);
  return <canvas ref={canvasRef} />;
}

export default BarChart;
