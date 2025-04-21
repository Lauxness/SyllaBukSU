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

    const labels = [
      "Descriptions",
      "Course Outcomes",
      "Learning Outcomes",
      "All in One",
    ];
    const variants = [
      "Course Description",
      "course Outcomes",
      "Specific Learning Outcomes",
      "All in One",
    ];

    const data = props.savedPrompts
      ? variants.map(
          (variant) =>
            props.savedPrompts.filter((p) => p.variant === variant).length
        )
      : [];

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
              color: "rgba(255, 255, 255, 0.04)", // Grid color for x-axis
            },
            ticks: {
              color: "white", // Color of the x-axis labels
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
            position: "top", // Place the legend at the top
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

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
}

export default BarChart;
