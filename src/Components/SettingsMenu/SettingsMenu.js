import React from "react";
import { currentColorContext } from "../../contexts/CurrentColorTheme";
import "./SettingsMenu.css";
import SettingsMenuOption from "./SettingsMenuOption/SettingsMenuOption";

export const SettingsMenu = (props) => {
  const { handleBackgroundThemeChange } =
    React.useContext(currentColorContext);
    
    function signOut(){
      props.auth.signOut()
    }
    
  return (
    <section className="settingsmenu">
      <ul className="settingsmenu__list">
        <h2 className="settingsmenu__category-title">General Settings</h2>
        <SettingsMenuOption OptionName='Background Color' Callback={handleBackgroundThemeChange} ButtonName='Change Theme' />
        <h2 className="settingsmenu__category-title">User Settings</h2>
        <SettingsMenuOption OptionName='Log Out' Callback={props.signOutMethod} ButtonName='Log Out' />
      </ul>
    </section>
  );
};
