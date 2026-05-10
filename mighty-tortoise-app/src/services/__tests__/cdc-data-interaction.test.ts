import {
  constructCdcUrlString,
  convertRawJsonToLineChartData,
  convertRawJsonToScatterChartData,
  CdcResponseDataType,
} from '../cdc-data-interaction';

describe('CDC Data Interaction Functions', () => {
  describe('constructCdcUrlString', () => {
    beforeEach(() => {
      // Mock Date to have consistent tests
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-06-01T12:00:00Z'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should construct a valid CDC URL string for a given state', () => {
      const state = 'ca';
      const result = constructCdcUrlString(state);

      expect(result).toContain('https://data.cdc.gov/resource/ymmh-divb.json');
      expect(result).toContain("state_territory='ca'");
      expect(result).toContain('$order=sample_collect_date DESC');
      expect(result).toContain('$limit=20');
    });

    it('should handle different state codes', () => {
      const states = ['NY', 'TX', 'FL'];

      states.forEach((state) => {
        const result = constructCdcUrlString(state);
        expect(result).toContain(`state_territory='${state}'`);
      });
    });

    it('should include a date filter for 6 months ago', () => {
      const result = constructCdcUrlString('CA');
      expect(result).toMatch(
        /sample_collect_date > '2023-12-01T\d{2}:\d{2}:\d{2}\.\d{3}Z'/
      );
    });
  });

  describe('convertRawJsonToLineChartData', () => {
    const mockData: CdcResponseDataType[] = [
      {
        record_id: '1',
        counties_served: 'County A',
        sample_collect_date: '2024-01-01',
        pcr_target_avg_conc: '100.5',
        site: 'Site 1',
        state_territory: 'CA',
        source: 'Source 1',
        county_fips: '123',
        population_served: '50000',
        sample_id: 'S1',
        sample_type: 'Type A',
        sample_matrix: 'Matrix A',
        sample_location: 'Location A',
        flow_rate: '10',
        concentration_method: 'Method A',
        pasteurized: 'No',
        pcr_type: 'Type A',
        extraction_method: 'Method A',
        major_lab_method: 'Lab A',
        inhibition_detect: 'No',
        ntc_amplify: 'No',
        pcr_target: 'Target A',
        pcr_gene_target_agg: 'Gene A',
        pcr_target_units: 'Units A',
        lod_sewage: '5.0',
        pcr_target_detect: 'Yes',
        pcr_target_avg_conc_lin: '100',
        pcr_target_flowpop_lin: '2.0',
        rec_eff_percent: '85',
        rec_eff_target_name: 'Target A',
        rec_eff_spike_matrix: 'Matrix A',
        rec_eff_spike_conc: '50',
        date_updated: '2024-01-02',
        hum_frac_mic_conc: '25.5',
        hum_frac_target_mic: 'Target A',
      },
      {
        record_id: '2',
        counties_served: 'County A',
        sample_collect_date: '2024-01-02',
        pcr_target_avg_conc: '150.7',
        site: 'Site 1',
        state_territory: 'CA',
        source: 'Source 1',
        county_fips: '123',
        population_served: '50000',
        sample_id: 'S2',
        sample_type: 'Type A',
        sample_matrix: 'Matrix A',
        sample_location: 'Location A',
        flow_rate: '10',
        concentration_method: 'Method A',
        pasteurized: 'No',
        pcr_type: 'Type A',
        extraction_method: 'Method A',
        major_lab_method: 'Lab A',
        inhibition_detect: 'No',
        ntc_amplify: 'No',
        pcr_target: 'Target A',
        pcr_gene_target_agg: 'Gene A',
        pcr_target_units: 'Units A',
        lod_sewage: '5.0',
        pcr_target_detect: 'Yes',
        pcr_target_avg_conc_lin: '150',
        pcr_target_flowpop_lin: '3.0',
        rec_eff_percent: '90',
        rec_eff_target_name: 'Target A',
        rec_eff_spike_matrix: 'Matrix A',
        rec_eff_spike_conc: '60',
        date_updated: '2024-01-03',
        hum_frac_mic_conc: '30.2',
        hum_frac_target_mic: 'Target A',
      },
      {
        record_id: '3',
        counties_served: 'County B',
        sample_collect_date: '2024-01-01',
        pcr_target_avg_conc: '75.3',
        site: 'Site 2',
        state_territory: 'CA',
        source: 'Source 2',
        county_fips: '456',
        population_served: '75000',
        sample_id: 'S3',
        sample_type: 'Type B',
        sample_matrix: 'Matrix B',
        sample_location: 'Location B',
        flow_rate: '15',
        concentration_method: 'Method B',
        pasteurized: 'Yes',
        pcr_type: 'Type B',
        extraction_method: 'Method B',
        major_lab_method: 'Lab B',
        inhibition_detect: 'Yes',
        ntc_amplify: 'Yes',
        pcr_target: 'Target B',
        pcr_gene_target_agg: 'Gene B',
        pcr_target_units: 'Units B',
        lod_sewage: '8.0',
        pcr_target_detect: 'Yes',
        pcr_target_avg_conc_lin: '75',
        pcr_target_flowpop_lin: '1.5',
        rec_eff_percent: '80',
        rec_eff_target_name: 'Target B',
        rec_eff_spike_matrix: 'Matrix B',
        rec_eff_spike_conc: '40',
        date_updated: '2024-01-02',
        hum_frac_mic_conc: '20.1',
        hum_frac_target_mic: 'Target B',
      },
    ];

    it('should convert raw JSON data to line chart format', () => {
      const result = convertRawJsonToLineChartData(mockData);

      expect(result).toHaveLength(2); // Two counties
      expect(result[0]).toMatchObject({
        type: 'scatter',
        mode: 'lines+markers',
        line: { shape: 'spline', smoothing: 0.8 },
      });
    });

    it('should group data by counties_served', () => {
      const result = convertRawJsonToLineChartData(mockData);

      const countyAData = result.find((item) => item.name === 'County A');
      const countyBData = result.find((item) => item.name === 'County B');

      expect(countyAData).toBeDefined();
      expect(countyBData).toBeDefined();
      expect(countyAData!.x).toHaveLength(2);
      expect(countyBData!.x).toHaveLength(1);
    });

    it('should correctly parse dates and concentrations', () => {
      const result = convertRawJsonToLineChartData(mockData);

      const countyAData = result.find((item) => item.name === 'County A');
      expect(countyAData!.x).toEqual(['2024-01-01', '2024-01-02']);
      expect(countyAData!.y).toEqual([100.5, 150.7]);
    });

    it('should handle empty data', () => {
      const result = convertRawJsonToLineChartData([]);
      expect(result).toEqual([]);
    });
  });

  describe('convertRawJsonToScatterChartData', () => {
    const mockData: CdcResponseDataType[] = [
      {
        record_id: '1',
        counties_served: 'County A',
        hum_frac_mic_conc: '25.5',
        pcr_target_avg_conc: '100.5',
        lod_sewage: '5.0',
        site: 'Site 1',
        state_territory: 'CA',
        source: 'Source 1',
        county_fips: '123',
        population_served: '50000',
        sample_id: 'S1',
        sample_collect_date: '2024-01-01',
        sample_type: 'Type A',
        sample_matrix: 'Matrix A',
        sample_location: 'Location A',
        flow_rate: '10',
        concentration_method: 'Method A',
        pasteurized: 'No',
        pcr_type: 'Type A',
        extraction_method: 'Method A',
        major_lab_method: 'Lab A',
        inhibition_detect: 'No',
        ntc_amplify: 'No',
        pcr_target: 'Target A',
        pcr_gene_target_agg: 'Gene A',
        pcr_target_units: 'Units A',
        pcr_target_detect: 'Yes',
        pcr_target_avg_conc_lin: '100',
        pcr_target_flowpop_lin: '2.0',
        rec_eff_percent: '85',
        rec_eff_target_name: 'Target A',
        rec_eff_spike_matrix: 'Matrix A',
        rec_eff_spike_conc: '50',
        date_updated: '2024-01-02',
        hum_frac_target_mic: 'Target A',
      },
      {
        record_id: '2',
        counties_served: 'County B',
        hum_frac_mic_conc: '30.2',
        pcr_target_avg_conc: '150.7',
        lod_sewage: '8.0',
        site: 'Site 2',
        state_territory: 'CA',
        source: 'Source 2',
        county_fips: '456',
        population_served: '75000',
        sample_id: 'S2',
        sample_collect_date: '2024-01-01',
        sample_type: 'Type B',
        sample_matrix: 'Matrix B',
        sample_location: 'Location B',
        flow_rate: '15',
        concentration_method: 'Method B',
        pasteurized: 'Yes',
        pcr_type: 'Type B',
        extraction_method: 'Method B',
        major_lab_method: 'Lab B',
        inhibition_detect: 'Yes',
        ntc_amplify: 'Yes',
        pcr_target: 'Target B',
        pcr_gene_target_agg: 'Gene B',
        pcr_target_units: 'Units B',
        pcr_target_detect: 'Yes',
        pcr_target_avg_conc_lin: '150',
        pcr_target_flowpop_lin: '3.0',
        rec_eff_percent: '90',
        rec_eff_target_name: 'Target B',
        rec_eff_spike_matrix: 'Matrix B',
        rec_eff_spike_conc: '60',
        date_updated: '2024-01-03',
        hum_frac_target_mic: 'Target B',
      },
    ];

    it('should convert raw JSON data to scatter chart format', () => {
      const result = convertRawJsonToScatterChartData(mockData);

      expect(result).toHaveLength(2); // Two counties
      expect(result[0]).toMatchObject({
        type: 'scatter3d',
        mode: 'markers',
      });
    });

    it('should group data by counties_served', () => {
      const result = convertRawJsonToScatterChartData(mockData);

      const countyAData = result.find((item) => item.name === 'County A');
      const countyBData = result.find((item) => item.name === 'County B');

      expect(countyAData).toBeDefined();
      expect(countyBData).toBeDefined();
    });

    it('should correctly parse numeric values for x, y, z coordinates', () => {
      const result = convertRawJsonToScatterChartData(mockData);

      const countyAData = result.find((item) => item.name === 'County A');
      expect(countyAData!.x).toEqual([25.5]);
      expect(countyAData!.y).toEqual([100.5]);
      expect(countyAData!.z).toEqual([5.0]);

      const countyBData = result.find((item) => item.name === 'County B');
      expect(countyBData!.x).toEqual([30.2]);
      expect(countyBData!.y).toEqual([150.7]);
      expect(countyBData!.z).toEqual([8.0]);
    });

    it('should handle empty data', () => {
      const result = convertRawJsonToScatterChartData([]);
      expect(result).toEqual([]);
    });

    it('should handle multiple data points for the same county', () => {
      const multipleDataPoints = [
        ...mockData,
        {
          ...mockData[0],
          record_id: '3',
          hum_frac_mic_conc: '35.0',
          pcr_target_avg_conc: '120.0',
          lod_sewage: '6.0',
        },
      ];

      const result = convertRawJsonToScatterChartData(multipleDataPoints);
      const countyAData = result.find((item) => item.name === 'County A');

      expect(countyAData!.x).toEqual([25.5, 35.0]);
      expect(countyAData!.y).toEqual([100.5, 120.0]);
      expect(countyAData!.z).toEqual([5.0, 6.0]);
    });
  });
});
