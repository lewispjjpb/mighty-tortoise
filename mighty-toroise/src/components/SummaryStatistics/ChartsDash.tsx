import { useState, useEffect, JSX } from 'react';
import { constructCdcUrlString} from "@site/src/utils/cdc-data-interaction";
import {FetchService} from "@site/src/services/fetch-service";import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { STATE_MAP} from "@site/src/utils/app-constants";
import {SampleDataLineChart} from "@site/src/components/SummaryStatistics/SampleDataLineChart";
import {AppErrorBoundary} from "@site/src/components/shared/ErrorBoundary";


export const ChartsDash = () => {
  const [data, setData] = useState([]);
  const [selectedState, setSelectedState] = useState('ma');

  useEffect(() => {
    const url = constructCdcUrlString(selectedState);
    const request = new FetchService(url);
    request.getData().then((data) => {
      console.log('setting')
      setData(data)
    })
      .catch((err) => console.log('err: ', err));
  },[selectedState])

  const StateSelect = ():JSX.Element => {
    const handleChange = (event: SelectChangeEvent) => {
      setSelectedState(event.target.value);
    };
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="Select State">State</InputLabel>
          <Select
            labelId="select-state-label"
            id="state-select"
            label="State"
            onChange={handleChange}
            value={selectedState}
          >
            { Object.entries(STATE_MAP).map(([key, value]) => (
              <MenuItem key={value} value={value}>{key}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  }

  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      <StateSelect />
      ChartsDash
      <AppErrorBoundary>
        <SampleDataLineChart rawResponseData={data} />
      </AppErrorBoundary>
    </Box>
  )
}