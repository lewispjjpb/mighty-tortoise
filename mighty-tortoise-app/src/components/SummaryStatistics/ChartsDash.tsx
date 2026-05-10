import { useState, useEffect, JSX } from 'react';
import { constructCdcUrlString } from '@site/src/services/cdc-data-interaction';
import { FetchService } from '@site/src/services/fetch-service';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { STATE_MAP } from '@site/src/utils/app-constants';
import { SampleDataLineChart } from '@site/src/components/SummaryStatistics/SampleDataLineChart';
import { AppErrorBoundary } from '@site/src/components/Shared/ErrorBoundary';
import { SampleDataScatterChart } from '@site/src/components/SummaryStatistics/SampleDataScatterChart';
import styles from './styles.module.css';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';


export const ChartsDash = () => {
  const [data, setData] = useState([]);
  const [selectedState, setSelectedState] = useState('ma');

  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) {
      return;
    }

    const url = constructCdcUrlString(selectedState);
    const request = new FetchService(url);
    request
      .getData()
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.error(err);
        alert(
          'There was an error fetching data from the CDC API. Please try again later.'
        );
        setData([]);
      });
  }, [selectedState]);

  const StateSelect = (): JSX.Element => {
    const handleChange = (event: SelectChangeEvent) => {
      setSelectedState(event.target.value);
    };
    return (
      <FormControl size="small">
        <InputLabel id="Select State" shrink>
          State
        </InputLabel>
        <Select
          labelId="select-state-label"
          id="state-select"
          label="State"
          onChange={handleChange}
          value={selectedState}
          size="small"
          margin="dense"
        >
          {Object.entries(STATE_MAP).map(([key, value]) => (
            <MenuItem key={value} value={value}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  return (
    <Box className="workspace-container">
      <StateSelect />
        <Box className={styles.chartContainerBox}>
          <AppErrorBoundary>
            <SampleDataLineChart rawResponseData={data}/>
          </AppErrorBoundary>
          <AppErrorBoundary>
            <SampleDataScatterChart rawResponseData={data}/>
          </AppErrorBoundary>
        </Box>
    </Box>
  );
};
