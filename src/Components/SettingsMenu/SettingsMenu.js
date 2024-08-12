import React from "react";
import { currentColorContext } from "../../contexts/CurrentColorTheme";
import "./SettingsMenu.css";
import SettingsMenuOption from "./SettingsMenuOption/SettingsMenuOption";

export const SettingsMenu = () => {
  const { handleBackgroundThemeChange, backgroundColor } =
    React.useContext(currentColorContext);

  return (
    <section className="settingsmenu">
      <ul className="settingsmenu__list">
        <h2 className="settingsmenu__category-title">General Settings</h2>
        <SettingsMenuOption OptionName='Background Color' Callback={handleBackgroundThemeChange} ButtonName='Change Theme' />
      </ul>
    </section>
  );
};
