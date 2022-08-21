import axios from 'axios';

const baseUrl = 'https://disease.sh/v3/covid-19';
export const fetchAllData = async (country) => {
  let changebleUrl = `${baseUrl}/all`;
  if (country && country !== 'global') {
    changebleUrl = `${baseUrl}/countries/${country}`;
  }
  try {
    const {
      data: { cases, recovered, deaths, updated },
    } = await axios.get(changebleUrl);
    return { cases, recovered, deaths, updated };
  } catch (error) {
    console.log(error);
  }
};
export const fetchCounties = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/countries`);
    return data.map((element) => element.country);
  } catch (error) {
    console.log(error);
  }
};
export const fetchCountriesData = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/countries`);
    return data.map((element) => ({
      name: element.country,
      code: element.countryInfo.iso2,
      cases: element.cases,
      recoveries: element.recovered,
      deaths: element.deaths,
    }));
  } catch (error) {
    console.log(error);
  }
};
