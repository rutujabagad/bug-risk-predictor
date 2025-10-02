import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const RiskChart = ({ bugRisk }) => {
  const data = {
    labels: ["Bug Risk", "Safe Code"],
    datasets: [
      {
        data: [bugRisk, 1 - bugRisk],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default RiskChart;
