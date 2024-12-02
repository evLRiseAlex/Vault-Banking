import { navBtn } from "./contants";

function NavButtons() {
  return (
    <ul className="nav__links">
      {navBtn.map((button) => (
        <li key={button} className="nav__item">
          <button className="button">{button}</button>
        </li>
      ))}
    </ul>
  );
}

export default NavButtons;
