import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function PieChartProgram(props) {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    const labels = ["COB", "CPAG", "COE", "CON", "CAS", "COT"];
    const data = [
      props.totalCOB,
      props.totalCPAG,
      props.totalCOB,
      props.totalCON,
      props.totalCAS,
      props.totalCOT,
    ];

    chartInstanceRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Total",
            data: data,
            backgroundColor: [
              "rgba(211, 162, 2, 1)",
              "rgba(7, 168, 122, 0.61)",
              "rgba(8, 109, 204, 0.61)",
              "rgba(255, 43, 32, 0.61)",
              "rgba(10, 93, 69, 0.61)",
              "rgba(188, 76, 76, 0.61)",
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

export default PieChartProgram;
