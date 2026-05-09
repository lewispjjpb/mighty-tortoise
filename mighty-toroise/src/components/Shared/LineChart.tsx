import Plot from 'react-plotly.js';
import { Layout } from 'plotly.js';
import { LineData } from '@site/src/services/cdc-data-interaction';

export type LineChartDataType = {
  data: LineData[];
  layout: Partial<Layout>;
};

export const LineChart = ({ data, layout }: LineChartDataType) => {
  return (
    <Plot
      data={data}
      layout={layout}
      useResizeHandler={true}
      style={{ width: '100%', height: '100%' }}
      config={{ responsive: true }}
    />
  );
};
