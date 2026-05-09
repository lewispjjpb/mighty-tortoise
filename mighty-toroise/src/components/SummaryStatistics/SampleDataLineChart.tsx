import { LineChart} from "@site/src/components/Shared/LineChart";
import {CdcResponseDataType, convertRawJsonToLineChartData} from "@site/src/services/cdc-data-interaction";
import {Layout} from "plotly.js";
import styles from './styles.module.css';

type SampleDataLineChartProps = {
  rawResponseData: CdcResponseDataType[];
}

const layout: Partial<Layout> = {
  title: {
    text: 'Time Series'
  },
  legend: {
    "orientation": "h"
  }
};
export const SampleDataLineChart = ({rawResponseData}: SampleDataLineChartProps) => {
  const data = rawResponseData?.length ?  convertRawJsonToLineChartData(rawResponseData) : [];
  return (
    <div className={styles.chartContainer}>
      <LineChart data={data} layout={layout}/>
    </div>
  )
}