import React from "react";
import ReactEcharts from "echarts-for-react";

const BarChartBasic = ({ categories, series }) => {
  const options = {
    grid: { top: 20, right: 40, bottom: 20, left: 40 },
    xAxis: {
      type: "category",
      data: categories,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: series,
        type: "bar",
        smooth: true,
        barMaxWidth: 32,
        barMinWidth: 32,
        barGap: "20%",
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };
  return (
    <div>
      <ReactEcharts
        option={options}
        style={{ width: "600px", height: "300px" }}
      ></ReactEcharts>
    </div>
  );
};

export default BarChartBasic;
