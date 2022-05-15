import { Link } from "react-router-dom";

export default function Element({ name, population, region, capital, image }) {
  return (
    <Link to={`/country/${name.replace(' ', '%20')}`} className="element">
      <div className="element__img">
        <img src={image} alt={name} />
      </div>
      <div className="element__text">
        <h2 className="element__name">{name}</h2>
        <ul className="element__stats">
          <li>
            Population: <span>{population}</span>
          </li>
          <li>
            Region: <span>{region}</span>
          </li>
          <li>
            Capital: <span>{capital}</span>
          </li>
        </ul>
      </div>
    </Link>
  );
}
