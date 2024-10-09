import React from "react";
import { currentColorContext } from "../../contexts/CurrentColorTheme";
import "./SettingsMenu.css";
import SettingsMenuOption from "./SettingsMenuOption/SettingsMenuOption";

export const SettingsMenu = (props) => {
  const { handleBackgroundThemeChange, backgroundColor } =
    React.useContext(currentColorContext);
    
    function signOut(){
      console.log('hi')
      props.auth.signOut()
    }

    console.log(props.auth)
    
  return (
    <section className="settingsmenu">
      <ul className="settingsmenu__list">
        <h2 className="settingsmenu__category-title">General Settings</h2>
        <SettingsMenuOption OptionName='Background Color' Callback={handleBackgroundThemeChange} ButtonName='Change Theme' />
        <h2 className="settingsmenu__category-title">User Settings</h2>
        <SettingsMenuOption OptionName='Log Out' Callback={signOut} ButtonName='Log Out' />
      </ul>
    </section>
  );
};
