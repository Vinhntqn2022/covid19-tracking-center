import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';

import { GlobalActions } from '../../redux/rootAction';
import { fetchAllData } from '../../api';
import Cards from './Cards';
import Chart from './Charts';
import CountryPicker from './CountryPicker';
import translate from '../../i18n/translate';

const Details = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [country, setCountry] = useState('');
  const fetchData = async () => {
    dispatch(GlobalActions.setIsLoading(true));
    try {
      const res = await fetchAllData();
      setData(res);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(GlobalActions.setIsLoading(false));
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleCountryChange = async (country) => {
    const fetchedData = await fetchAllData(country);
    setCountry(country);
    setData(fetchedData);
  };
  return (
    <>
      <Box
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
          height: '50px',
        }}
      ></Box>
      <Box
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Cards data={data} />
        <CountryPicker handleCountryChange={handleCountryChange} />
        <Chart data={data} country={country} />
      </Box>
      <Box
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
          height: '50px',
        }}
      ></Box>
    </>
  );
};
export default Details;
