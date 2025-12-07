// saabi different countries ko lagi didn't use it 

import countries from 'world-countries';//yo packages

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  }

  //returning object
  return {
    getAll,
    getByValue
  }
};

export default useCountries;
