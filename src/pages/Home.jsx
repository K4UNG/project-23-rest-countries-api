import { useEffect, useState } from "react";
import Element from "../components/Element/Element";

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("");

  async function fetchCountries(url, type = "load") {
    setError(null);
    setLoading(true);
    const response = await fetch(url);
    if (!response.ok) {
      if (type === "search") {
        setError("No results found");
      } else {
        setError("Something went wrong");
      }
      setLoading(false);
      return;
    }
    const data = await response.json();
    setCountries(data);
    setLoading(false);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input) {
        fetchCountries(
          `https://restcountries.com/v3.1/name/${input}`,
          "search"
        );
      } else {
        fetchCountries("https://restcountries.com/v3.1/all");
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  let content;
  if (loading) {
    content = <p className="loading">Loading...</p>;
  } else {
    content = (
      <div className="element__wrapper">
        {countries
          .filter((country) => (filter ? country.region : filter) === filter)
          .map((country) => {
            return (
              <Element
                key={country.name.common}
                name={country.name.common}
                image={country.flags.svg}
                population={country.population}
                region={country.region}
                capital={country.capital}
              />
            );
          })}
      </div>
    );
  }

  if (error) {
    content = <p className="error">{error}</p>;
  }

  return (
    <main className="home">
      <div className="home__inputs">
        <div className="home__input">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <input
          className="search"
          type="text"
          placeholder="Search for a country..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        </div>
        
        <select
          aria-label="filter by region"
          className="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option disabled value="">
            Filter by region
          </option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      {content}
    </main>
  );
}
