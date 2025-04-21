import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function Traffic(props) {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: props.labels,
        datasets: [
          {
            label: "CDs",
            data: props.description
              ? props.description.map((item) => item.count)
              : new Array(10).fill(0),

            borderColor: "rgb(138, 43, 63)",
            backgroundColor: "rgb(138, 43, 63)",
            borderWidth: 2,
            tension: 0.2,
            fill: false,
          },
          {
            label: "COs",
            data: props.courseOutcomes
              ? props.courseOutcomes.map((item) => item.count)
              : new Array(10).fill(0),
            borderColor: "rgb(7, 104, 168)",
            backgroundColor: "rgb(7, 104, 168)",
            borderWidth: 2,
            tension: 0.2,

            fill: false,
          },
          {
            label: "SLOs",
            data: props.learningOutcomes
              ? props.learningOutcomes.map((item) => item.count)
              : new Array(12).fill(0),
            borderColor: "rgb(178, 145, 61)",
            backgroundColor: "rgb(178, 145, 61)",
            borderWidth: 2,
            tension: 0.2,
            fill: false,
          },
          {
            label: "ALL",
            data: props.allInOne
              ? props.allInOne.map((item) => item.count)
              : new Array(10).fill(0),
            borderColor: "rgb(26, 105, 105)",
            backgroundColor: "rgb(26, 105, 105)",
            borderWidth: 2,
            tension: 0.2,
            fill: false,
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
              color: "rgba(255, 255, 255, 0.04)", // Set grid color for y-axis
            },
            ticks: {
              color: "white",
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "white",
              borderColor: "transparent",
            },
          },
        },
      },
    });

    // Cleanup function to destroy the chart when component unmounts
    return () => chartInstanceRef.current.destroy();
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%" }}></canvas>;
}

export default Traffic;
