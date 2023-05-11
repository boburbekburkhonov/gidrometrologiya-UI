import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import moment from "moment";

const CharStatistic = (param) => {
  const { dataStatistic } = param;
  const labels = [];

  dataStatistic?.length > 0
    ? dataStatistic[1].filter((e) =>
        labels.push(
          moment(new Date(e).setHours(new Date(e).getHours() - 5)).format("LT")
        )
      )
    : null;

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Bugungi ma'lumotlar",
        data: dataStatistic?.length > 0 ? dataStatistic[0] : null,
        backgroundColor: "rgb(1, 41, 112)",
        borderColor: "rgb(1, 41, 112)",
        tension: 0.4,
      },
    ],
  };

  const checkUnitOfMeasure = (measure) => {
    if (measure == "windDirection") {
      return "";
    } else if (measure == "windSpeed") {
      return "m/s";
    } else if (measure == "soilTemp") {
      return "°C";
    } else if (measure == "soilHumidity") {
      return "%";
    } else if (measure == "airTemp") {
      return "°C";
    } else if (measure == "airHumidity") {
      return "%";
    } else if (measure == "airPressure") {
      return "kPa";
    } else if (measure == "leafTemp") {
      return "°C";
    } else if (measure == "leafHumidity") {
      return "%";
    } else if (measure == "rainHeight") {
      return "mm";
    }
  };

  const option = {
    scales: {
      y: {
        ticks: {
          callback: (value) => {
            return (
              value +
              ` ${checkUnitOfMeasure(
                dataStatistic.length > 0 ? dataStatistic[2] : null
              )}`
            );
          },
        },
      },
    },
    plugins: {
      tooltip: {
        boxHeight: 25,
        boxWidth: 40,
        titleFont: {
          size: 15,
        },
        bodyFont: {
          size: 15,
        },
        callbacks: {
          label: function (context) {
            return `Bugungi ma'lumot: ${
              context.formattedValue
            } ${checkUnitOfMeasure(
              dataStatistic.length > 0 ? dataStatistic[2] : null
            )}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <Line className="char-statistic-wrapper" data={data} options={option} />
    </div>
  );
};

export default CharStatistic;
