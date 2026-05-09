import { LineChart} from "@site/src/components/shared/LineChart";
import {CdcResponseDataType, convertRawJsonToLineChartData} from "@site/src/utils/cdc-data-interaction";

type SampleDataLineChartProps = {
  rawResponseData: CdcResponseDataType[];
}


export const SampleDataLineChart = ({rawResponseData}: SampleDataLineChartProps) => {
  console.log('getting sample data', rawResponseData[0])
  const data = convertRawJsonToLineChartData(rawResponseData);
  console.log('data', data)
  return (
    <div>
      <h2>Sample Data</h2>
      <LineChart data={data}/>
    </div>
  )
}