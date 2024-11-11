import React from "react";
import { currentColorContext } from "../../contexts/CurrentColorTheme";
import "./SettingsMenu.css";
import SettingsMenuOption from "./SettingsMenuOption/SettingsMenuOption";
import { Message } from "../Message/Message";
import SettingsMenuPopup from "./SettingsMenuPopup/SettingsMenuPopup";
import ButtonRipple from "../ButtonRipple/ButtonRipple";

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
          <Message Username={props.user.displayName} ProfileURL={props.avatar} currentDate={'12:00'} MessageContent={'This is some text'}/>
          <form className="settingsmenu__edit-profile__form" type='submit' onSubmit={() => handleUpdateProfile}>
            <label>
              <input name="newUsername" />
            </label>
            <label>
              <input name="newAvatar"/>
            </label>
            <label>
              <input name="newEmail" />
            </label>
            <ButtonRipple type='submit' >Update</ButtonRipple>
          </form>
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
