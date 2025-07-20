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

    const labels = props.label;
    const data = props.data;
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
              font: {
                size: 10, // ← set font size for x-axis labels
              },
            },
          },
          y: {
            grid: {
              color: "rgba(255, 255, 255, 0.04)", // Grid color for y-axis
            },
            ticks: {
              color: "white", // Color of the y-axis labels
            },
          },
        },
        plugins: {
          legend: {
            display: false,
            position: "top",
            labels: {
              color: "white",
              padding: 20,
            },
          },
        },
      },
    });

    return () => chartInstanceRef.current.destroy();
  }, []);

  return <canvas ref={canvasRef} />;
}

export default BarChart;
