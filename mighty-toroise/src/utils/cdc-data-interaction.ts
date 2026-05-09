/**
 * This file contains the functions that interact with the CDC data.
 */


/**
 * This puts together the cdc url options.  For this exercise there
 * aren't many options.
 */
const cdcBaseUrl = 'https://data.cdc.gov/resource';
const resourceId = 'ymmh-divb';
const limit = 5;

export const constructCdcUrlString = (state: string) => {
  const now = new Date();
  const sixMonthsAgo:string = new Date(now.setMonth(now.getMonth() - 6)).toISOString();
  return `${cdcBaseUrl}/${resourceId}.json?$where=state_territory='${state}'
  AND sample_collect_date > '${sixMonthsAgo}'&$order=sample_collect_date DESC&$limit=${limit}
  `;
}


export type LineData = {
  x: string[],
  y: number[],
  type: 'scatter',
  mode: "lines+markers",
  marker: {color: string},
}

/**
 * This function takes the raw json data from the CDC and converts it
 * into the format that the line chart expects.
 */
export const convertRawJsonToLineChartData = (rawJson: CdcResponseDataType[]):LineData => {
  const lineData: LineData = {
    x: [],
    y: [],
    type: 'scatter',
    mode: 'lines+markers',
    marker: {color: 'red'},
  }

  for (const dataPoint of rawJson) {
    const x = (dataPoint.sample_collect_date);
    const y = parseFloat(dataPoint.pcr_target_avg_conc);
    lineData.x.push(x);
    lineData.y.push(y);
  }

  return lineData;
}


export type CdcResponseDataType = {
  "record_id": string,
  "site":string,
  "state_territory":string,
  "source":string,
  "county_fips":string,
  "counties_served":string,
  "population_served":string,
  "sample_id":string,
  "sample_collect_date":string,
  "sample_type":string,
  "sample_matrix":string,
  "sample_location":string,
  "flow_rate":string,
  "concentration_method":string,
  "pasteurized":string,
  "pcr_type":string,
  "extraction_method":string,
  "major_lab_method":string,
  "inhibition_detect":string,
  "ntc_amplify":string,
  "pcr_target":string,
  "pcr_gene_target_agg":string,
  "pcr_target_avg_conc":string,
  "pcr_target_units":string,
  "lod_sewage":string,
  "pcr_target_detect":string,
  "pcr_target_avg_conc_lin":string,
  "pcr_target_flowpop_lin":string,
  "rec_eff_percent":string,
  "rec_eff_target_name":string,
  "rec_eff_spike_matrix":string,
  "rec_eff_spike_conc":string,
  "date_updated":string,
}