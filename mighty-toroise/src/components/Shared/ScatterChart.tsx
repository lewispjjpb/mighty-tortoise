import Plot from "react-plotly.js";
import { Layout } from "plotly.js";
import {ScatterData} from "@site/src/services/cdc-data-interaction";

export type ScatterChartDataType = {
  data: ScatterData[],
  layout: Partial<Layout>
}


export const ScatterChart = ({data, layout}: ScatterChartDataType) => {
  return (
    <Plot
      data={data}
      layout={ layout }
    />

  )
}