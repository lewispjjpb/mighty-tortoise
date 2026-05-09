import {
  CdcResponseDataType,
  convertRawJsonToScatterChartData,
} from '@site/src/services/cdc-data-interaction';
import { ScatterChart } from '@site/src/components/Shared/ScatterChart';
import { Layout } from 'plotly.js';
import styles from './styles.module.css';

type SampleDataScatterChartProps = {
  rawResponseData: CdcResponseDataType[];
};

let layout: Partial<Layout> = {
  title: {
    text: 'Target vs. Reference',
  },
  legend: {
    orientation: 'h',
  },
  xaxis: {
    title: {
      text: 'x Axis',
    },
  },
  yaxis: {
    title: {
      text: 'y Axis',
    },
  },
  autosize: true,
};

export const SampleDataScatterChart = ({
  rawResponseData,
}: SampleDataScatterChartProps) => {
  const data = rawResponseData?.length
    ? convertRawJsonToScatterChartData(rawResponseData)
    : [];
  layout = {
    ...layout,
    xaxis: {
      ...layout.xaxis,
      title: {
        text: rawResponseData[0]?.hum_frac_target_mic,
      },
    },
    yaxis: {
      ...layout.yaxis,
      title: {
        text: rawResponseData[0]?.pcr_gene_target_agg,
      },
    },
  };
  return (
    <div className={styles.chartContainer}>
      <ScatterChart data={data} layout={layout} />
    </div>
  );
};
