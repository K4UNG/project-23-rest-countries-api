import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { names } from "../names";

export default function Country() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${name}?fullText=true`
      );

      if (!response.ok) {
        setError("Something went wrong!");
        setLoading(false);
      }
      const data = await response.json();
      if (mounted) {
        setDetail(data);
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [name]);

  let content;
  if (loading) {
    content = <p className="loading">Loading...</p>;
  } else if (error) {
    content = <p className="error">{error}</p>;
  } else if (!loading && !error) {
    content = (
      <>
        {detail.map((country) => {
          return (
            <div key={country.name.common} className="detail">
              <button className="back" onClick={() => navigate(-1)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>{" "}
                Back
              </button>
              <div className="detail__wrapper">
                <img
                  className="detail__img"
                  src={country.flags.svg}
                  alt={country.name.common}
                />
                <div className="detail__text">
                  <h3 className="detail__name">{country.name.common}</h3>

                  <div className="info__wrapper">
                    <ul className="detail__info">
                      <li>
                        Native Name:{" "}
                        <span>
                          {Object.values(country.name.nativeName)
                            .map((item) => item.official)
                            .join(", ")}
                        </span>
                      </li>
                      <li>
                        Population:{" "}
                        <span>{country.population.toLocaleString()}</span>
                      </li>
                      <li>
                        Region: <span>{country.region}</span>
                      </li>
                      <li>
                        Sub Region: <span>{country.subregion}</span>
                      </li>
                      <li>
                        Capital: <span>{country.capital[0]}</span>
                      </li>
                    </ul>

                    <ul className="detail__info">
                      <li>
                        Top Level Domain: <span>{country.tld.join(", ")}</span>
                      </li>
                      <li>
                        Currencies:{" "}
                        <span>{Object.keys(country.currencies)[0]}</span>
                      </li>
                      <li>
                        Languages:{" "}
                        <span>
                          {Object.values(country.languages).join(", ")}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="detail__borders">
                    <h3 className="borders">Border countries:</h3>
                    {!country.borders && <p>No border countries.</p>}
                    <div className="detail__borders--wrapper">
                      {country.borders?.map((border) => {
                        return (
                          <Link
                            className="detail__border"
                            key={border}
                            to={`/country/${names[border]}`}
                          >
                            {names[border]}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }

  return <>{content}</>;
}
