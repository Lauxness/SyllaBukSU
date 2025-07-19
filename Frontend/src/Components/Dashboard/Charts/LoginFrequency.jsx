import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function LoginFrequency(props) {
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
            label: "Login Frequency",
            data: props.description
              ? props.description.map((item) => item.count)
              : new Array(10).fill(0),

            borderColor: "rgb(138, 43, 63)",
            backgroundColor: "rgb(138, 43, 63)",
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

export default LoginFrequency;
