import React from "react";
import ReactEcharts from "echarts-for-react";

const LineChartBasic = ({ categories, series }) => {
  const options = {
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
        type: "line",
      },
    ],
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

export default LineChartBasic;
