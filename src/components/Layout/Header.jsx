import { Link } from "react-router-dom";

export default function Header() {
  function changeMode() {
    document.body.classList.toggle("dark");
  }
  return (
    <header className="header">
      <Link className="header__link" to="/">
        <h1 className="header__logo">Where in the world?</h1>
      </Link>
      <button onClick={changeMode} className="header__dark">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill=""
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>{" "}
        Dark mode
      </button>
    </header>
  );
}
