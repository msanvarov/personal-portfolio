"use client";

import classnames from "classnames";
import { useState } from "react";
import { menu } from "./menu";

export const HamburgerMenu = () => {
  const [isActive, setIsActive] = useState(false);

  const handleToggleActive = () => {
    setIsActive(!isActive);
  };
  return (
    <>
      <span className="icon-menu" onClick={handleToggleActive}>
        <span className="bar"></span>
        <span className="bar"></span>
      </span>
      <div
        className={classnames(`responsive-sidebar-menu`, { active: isActive })}
      >
        <div className="overlay" onClick={handleToggleActive}></div>
        <div className="sidebar-menu-inner">
          <div className="menu-wrap">
            <p>Menu</p>
            <ul className="menu scroll-nav-responsive d-flex">
              {menu.map((entry) => (
                <li key={entry.id}>
                  <a
                    className="scroll-to"
                    href={`#${entry.id}`}
                    onClick={handleToggleActive}
                  >
                    <i className={entry.icon}></i> <span>{entry.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-social">
            <p>Contact</p>
            <ul className="social-links d-flex align-items-center">
              <li>
                <a href="https://twitter.com">
                  <i className="lab la-twitter"></i>
                </a>
              </li>
              <li>
                <a href="https://dribble.com">
                  <i className="lab la-dribbble"></i>
                </a>
              </li>
              <li>
                <a href="https://instagram.com">
                  <i className="lab la-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
