import Plot from "react-plotly.js";
import {LineData} from "@site/src/utils/cdc-data-interaction";

export type LineChartDataType = {
  data: LineData[]
}

const layout = {title: {text: 'Time Series'}};


export const LineChart = ({data}: LineChartDataType) => {
  console.log({'line chart': data})
    return (
    <Plot
      data={data}
      layout={ layout }
    />

    )
}