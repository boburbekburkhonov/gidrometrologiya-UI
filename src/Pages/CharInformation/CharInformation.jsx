import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "../../assets/css/style.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const CharInformation = (props) => {
  const { data } = props;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Ma'lumotlar statistikasi",
      },
    },
  };

  const labels = [...data.map((e) => e.name)];

  const dataAll = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Ma'lumotlar",
        data: data.map((e) => e.length),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} className="char" data={dataAll} />;
};

export default CharInformation;
