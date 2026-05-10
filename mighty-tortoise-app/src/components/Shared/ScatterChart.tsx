import { Layout } from 'plotly.js';
import { ScatterData } from '@site/src/services/cdc-data-interaction';
import { useEffect, useState } from 'react';

export type ScatterChartDataType = {
  data: ScatterData[];
  layout: Partial<Layout>;
};

export const ScatterChart = ({ data, layout }: ScatterChartDataType) => {
  const [Plot, setPlot] = useState<any>(null);

  useEffect(() => {
    // This only runs in the browser
    import('react-plotly.js').then((module) => {
      setPlot(() => module.default);
    });
  }, []);

  if (!Plot) return <div>Loading Chart Engine...</div>;

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
