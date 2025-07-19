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
    const labels = ["BSIT", "BSEMC"];
    const data = [props.totalBSIT, props.totalBSEMC];

    chartInstanceRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Sample Data",
            data: data,
            backgroundColor: [
              "rgba(43, 84, 138, 1)",
              "rgba(7, 168, 122, 0.61)",
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
