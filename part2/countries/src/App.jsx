import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [showCountry, setShowCountry] = useState(null);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  useEffect(() => {
    if (countries.length === 1) {
      setShowCountry(countries[0]);
    }
  }, [showCountry]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setShowCountry(null);
  };

  const handleShowCountry = (country) => {
    setShowCountry(country);
  };

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  const showCountryInfo = () => {
    if (countriesToShow.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (countriesToShow.length === 1) {
      const country = countriesToShow[0];
      return (
        <>
          <h1>{country.name.common}</h1>
          <p>Capital: {country.capital[0]}</p>
          <p>Population: {country.population}</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(country.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={country.name.common} width="100" />
        </>
      );
    } else {
      return (
        <ul>
          {countriesToShow.map((country) => (
            <li key={country.cca2}>
              {country.name.common}
              <button onClick={() => handleShowCountry(country)}>show</button>
            </li>
          ))}
        </ul>
      );
    }
  };

  const displayCountryDetails = (country) => {
    return (
      <>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital[0]}</p>
        <p>Population: {country.population}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.name.common} width="100" />
      </>
    );
  };

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      {showCountry ? displayCountryDetails(showCountry) : showCountryInfo()}
    </div>
  );
}

export default App;
