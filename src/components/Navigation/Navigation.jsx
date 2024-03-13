import { NavLink } from "react-router-dom";

import css from "./Navigation.module.css";

const makeActiveClass = ({ isActive }) => {
  return `css.link ${isActive && css.isActive}`;
};

export default function Navigation() {
  return (
    <nav>
      <NavLink to="/" className={makeActiveClass}>
        Home
      </NavLink>
      <NavLink to="/movies" className={makeActiveClass}>
        Movies
      </NavLink>
    </nav>
  );
}
