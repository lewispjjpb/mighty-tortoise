/**
 * This file contains the functions that interact with the CDC data.
 */

/**
 * This puts together the cdc url options.  For this exercise there
 * aren't many options.
 * Data dictionary: https://dev.socrata.com/foundry/data.cdc.gov/ymmh-divb
 */
const cdcBaseUrl = 'https://data.cdc.gov/resource';
const resourceId = 'ymmh-divb';
const limit = 500;

export const constructCdcUrlString = (state: string) => {
  const now = new Date();
  const sixMonthsAgo: string = new Date(
    now.setMonth(now.getMonth() - 6)
  ).toISOString();
  return `${cdcBaseUrl}/${resourceId}.json?$where=state_territory='${state}' AND sample_collect_date > '${sixMonthsAgo}'&$order=sample_collect_date DESC&$limit=${limit}`;
};

export type LineData = {
  x: string[];
  y: number[];
  type: 'scatter';
  mode: 'lines+markers';
  name: string;
  line: { shape: 'spline'; smoothing: number };
};

/**
 * This function takes the raw json data from the CDC and converts it
 * into the format that the line chart expects.
 */
export const convertRawJsonToLineChartData = (
  rawJson: CdcResponseDataType[]
): LineData[] => {
  const allLineData: { [name: string]: LineData } = {};

  for (const dataPoint of rawJson) {
    if (!allLineData[dataPoint.counties_served]) {
      allLineData[dataPoint.counties_served] = {
        name: dataPoint.counties_served,
        x: [],
        y: [],
        type: 'scatter',
        mode: 'lines+markers',
        line: { shape: 'spline', smoothing: 0.8 },
      };
    }
    const x = dataPoint.sample_collect_date;
    const y = parseFloat(dataPoint.pcr_target_avg_conc);
    allLineData[dataPoint.counties_served].x.push(x);
    allLineData[dataPoint.counties_served].y.push(y);
  }

  return Object.values(allLineData);
};

export type ScatterData = {
  x: number[];
  y: number[];
  z: number[];
  type: 'scatter3d';
  mode: 'markers';
  name: string;
};
/**
 * Turns raw data into scatterchart data
 */
export const convertRawJsonToScatterChartData = (
  rawJson: CdcResponseDataType[]
): ScatterData[] => {
  const allLineData: { [name: string]: ScatterData } = {};

  for (const dataPoint of rawJson) {
    if (!allLineData[dataPoint.counties_served]) {
      allLineData[dataPoint.counties_served] = {
        name: dataPoint.counties_served,
        x: [],
        y: [],
        z: [],
        type: 'scatter3d',
        mode: 'markers',
      };
    }
    const x = parseFloat(dataPoint.hum_frac_mic_conc);
    const y = parseFloat(dataPoint.pcr_target_avg_conc);
    const z = parseFloat(dataPoint.lod_sewage);
    allLineData[dataPoint.counties_served].x.push(x);
    allLineData[dataPoint.counties_served].y.push(y);
    allLineData[dataPoint.counties_served].z.push(z);
  }

  return Object.values(allLineData);
};

export type CdcResponseDataType = {
  record_id: string;
  site: string;
  state_territory: string;
  source: string;
  county_fips: string;
  counties_served: string;
  population_served: string;
  sample_id: string;
  sample_collect_date: string;
  sample_type: string;
  sample_matrix: string;
  sample_location: string;
  flow_rate: string;
  concentration_method: string;
  pasteurized: string;
  pcr_type: string;
  extraction_method: string;
  major_lab_method: string;
  inhibition_detect: string;
  ntc_amplify: string;
  pcr_target: string;
  pcr_gene_target_agg: string;
  pcr_target_avg_conc: string;
  pcr_target_units: string;
  lod_sewage: string;
  pcr_target_detect: string;
  pcr_target_avg_conc_lin: string;
  pcr_target_flowpop_lin: string;
  rec_eff_percent: string;
  rec_eff_target_name: string;
  rec_eff_spike_matrix: string;
  rec_eff_spike_conc: string;
  date_updated: string;
  hum_frac_mic_conc: string;
  hum_frac_target_mic: string;
};
