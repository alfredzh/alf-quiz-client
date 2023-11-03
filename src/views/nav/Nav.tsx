import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="main-nav">
      <NavLink
        to="/miners"
        className={({ isActive }) => `icon-miner ${isActive ? "active" : ""}`}
      >
        Miners
      </NavLink>
      <NavLink
        to="/asteroids"
        className={({ isActive }) =>
          `icon-asteroid ${isActive ? "active" : ""}`
        }
      >
        Asteroids
      </NavLink>
      <NavLink
        to="/planets"
        className={({ isActive }) => `icon-planet ${isActive ? "active" : ""}`}
      >
        Planets
      </NavLink>
    </nav>
  );
}
