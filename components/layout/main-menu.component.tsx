import { menu } from "./menu";

export const MainMenu = () => {
  return (
    <ul className="menu scroll-nav d-flex">
      {menu.map((entry) => (
        <li key={entry.id}>
          <a className="scroll-to" href={`#${entry.id}`}>
            <span>{entry.text}</span> <i className={entry.icon}></i>
          </a>
        </li>
      ))}
    </ul>
  );
};
