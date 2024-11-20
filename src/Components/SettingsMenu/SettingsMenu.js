import React from "react";
import { currentColorContext } from "../../contexts/CurrentColorTheme";
import "./SettingsMenu.css";
import SettingsMenuOption from "./SettingsMenuOption/SettingsMenuOption";
import { Message } from "../Message/Message";
import SettingsMenuPopup from "./SettingsMenuPopup/SettingsMenuPopup";
import ButtonRipple from "../ButtonRipple/ButtonRipple";
import CustomForm from "../CustomForm/CustomForm";

export const SettingsMenu = (props) => {
  const [profileEditOpen, setProfileEditOpen] = React.useState(false);

  const { handleBackgroundThemeChange } = React.useContext(currentColorContext);

  console.log(props.auth)

  function openEditProfile(){
    setProfileEditOpen(true)
  }

  function closeEditProfile(){
    setProfileEditOpen(false)
  }

  function handleUpdateProfile(e, newUsername="", newAvatar="", newEmail=""){
    e.preventDefault();

  }

  function signOut() {
    props.auth.signOut();
  }

  return (
    <section className="settingsmenu">
      {profileEditOpen ? (
       <SettingsMenuPopup name="edit-profile" callbackFunction={closeEditProfile} height={'210px'}>
          <h1>Edit Profile</h1>
          <Message Username={props.user.displayName} ProfileURL={props.avatar} currentDate={new Date(Date.now()).toUTCString()} MessageContent={'This is some text'} color={'rgb(255,255,255,0.1)'}/>
          <CustomForm formName = "update_profile" submitButtonName={'Reset Information'}>
          <label className="login-landing-page__label" for="reset-username">
                <input
                  className="login-landing-page__input"
                  type="text"
                  id="reset-username"
                  placeholder="New Username"
                  required
                  minLength="5"
                  maxLength="35"
                />
              </label>
              <label className="login-landing-page__label" for="login-password">
              <input
                  className="login-landing-page__input"
                  type="text"
                  id="reset-password"
                  placeholder="New Password"
                  required
                  minLength="5"
                  maxLength="35"
                />
              </label>
          </CustomForm>
       </SettingsMenuPopup>
      ) : (
        <ul className="settingsmenu__list">
          <h2 className="settingsmenu__category-title">General Settings</h2>
          <SettingsMenuOption
            OptionName="Background Color"
            Callback={handleBackgroundThemeChange}
            ButtonName="Change Theme"
          />
          <h2 className="settingsmenu__category-title">User Settings</h2>
          <SettingsMenuOption
            OptionName="Log Out"
            Callback={() => signOut()}
            ButtonName="Log Out"
          />
          <SettingsMenuOption
            OptionName="Edit User Profile"
            ButtonName="Edit"
            Callback={openEditProfile}
          />
        </ul>
      )}
    </section>
  );
};
