import React from "react";
import { currentColorContext } from "../contexts/CurrentColorTheme";
import "./SettingsMenu.css";

export const SettingsMenu = () => {
  const { handleBackgroundThemeChange, backgroundColor } =
    React.useContext(currentColorContext);

  return (
    <section className="settingsmenu">
      <ul className="settingsmenu__list">
        <h2 className="settingsmenu__category-title">General Settings</h2>
        <li className="settingsmenu__setting">
          <p className="settingsmenu__setting-title">Background Colour</p>
          <button
            className={`settings__menu-button settings__menu-button_${backgroundColor} menu__setting-title-switch`}
            onClick={handleBackgroundThemeChange}
          >
            {backgroundColor === "dark" ? "Light" : "Dark"}
          </button>
        </li>
        <li className="settingsmenu__setting">
          <p className="settingsmenu__setting-title">Font Size</p>
        </li>
      </ul>
    </section>
  );
};
