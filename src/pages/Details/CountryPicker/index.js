import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@mui/material';

import { fetchCounties } from '../../../api';

const CountryPicker = ({ handleCountryChange }) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);
  const fetchCountiesApi = async () => {
    setFetchedCountries(await fetchCounties());
  };
  useEffect(() => {
    fetchCountiesApi();
  }, [setFetchedCountries]);

  return (
    <FormControl sx={{ width: '50%', marginX: 'auto' }}>
      <NativeSelect
        defaultValue=''
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value='global'>Global</option>
        {fetchedCountries?.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};
export default CountryPicker;
