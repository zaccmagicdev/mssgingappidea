import React from "react";
import ButtonRipple from "../../../Components/ButtonRipple/ButtonRipple";
import "./SettingsMenuOption.css";
import { currentColorContext } from "../../../contexts/CurrentColorTheme"

function SettingsMenuOption(props) {
  const { backgroundColor } = React.useContext(currentColorContext);

  return (
    <li className="settingsmenu__setting">
      <p className="settingsmenu__setting-title">{props.OptionName}</p>
      <ButtonRipple
        className={`settings__menu-button menu__setting-title-switch`}
        onClick={props.Callback}
      >
        {props.ButtonName}
      </ButtonRipple>
    </li>
  );
}

export default SettingsMenuOption;
