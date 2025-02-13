export const fetchCountries = async () => {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name"
  );
  const data = await response.json();
  return data.map((country: any) => country.name.common);
};
