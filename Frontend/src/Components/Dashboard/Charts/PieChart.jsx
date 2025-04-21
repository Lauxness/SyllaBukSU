import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function PieChart(props) {
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
    const data = [
      props.totalDescription,
      props.totalCOs,
      props.totalSLOs,
      props.totalAIO,
    ];

    chartInstanceRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Sample Data",
            data: data,
            backgroundColor: [
              "rgb(138, 43, 63)",
              "rgb(7, 104, 168)",
              "rgb(178, 145, 61)",
              "rgb(26, 105, 105)",
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right", // 👈 align legend to the right
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

export default PieChart;
