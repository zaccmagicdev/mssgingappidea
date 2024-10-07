import React from "react";
import "./LoginLandingPage.css";
import ButtonRipple from "../ButtonRipple/ButtonRipple";

function LoginLandingPage(props) {

  const [activeState, setActiveState] = React.useState("");

  function setActive(){
    setActiveState('active');
  }

  function removeActive(){
    setActiveState("");
  }

  return (
    <section className="login-landing-page__background">
      <div className={`login-landing-page__container ${activeState}`}>
        <div className="login-landing-page__section login-landing-page__section_register">
          <form className="login-landing-page__form">
            <h1 className="login-landing-page__header">Create Account</h1>
            <p className="login-landing-page__text">
              You can also create an account through
            </p>
            <div className="login-landing-page__other-options-container">
              <button className="login-landing-page__link login-landing-page__external-link login-landing-page__google-link" />
              <button className="login-landing-page__link login-landing-page__external-link login-landing-page__apple-link" />
            </div>
            <label
              className="login-landing-page__label"
              for="register-username"
            >
              <input
                className="login-landing-page__input"
                type="text"
                id="register-username"
                placeholder="Username"
                required
                minLength="5"
                maxLength="16"
              />
            </label>
            <label
              className="login-landing-page__label"
              for="register-password"
            >
              <input
                className="login-landing-page__input"
                type="password"
                id="register-password"
                placeholder="Password"
                required
                minLength="8"
                maxLength="20"
              />
            </label>
            <label className="login-landing-page__label login-landing-page__label-date" for="register-dob">
              <input
                type="date"
                id="register-dob"
                max="2012-01-01"
                min="1941-01-01"
              />
            </label>
            <ButtonRipple
              className="login-landing-page__link"
              id="register-submit"
            >
              Sign Up
            </ButtonRipple>
          </form>
        </div>
        <div className="login-landing-page__section login-landing-page__section_login">
          <form className="login-landing-page__form">
            <h1 className="login-landing-page__header">Welcome back!</h1>
            <p className="login-landing-page__other-options-text">
              You can also sign in through
            </p>
            <div className="login-landing-page__other-options-container">
              <button className="login-landing-page__link login-landing-page__external-link login-landing-page__google-link" onClick={props.googleSignIn} />
              <button className="login-landing-page__link login-landing-page__external-link login-landing-page__apple-link" onClick={props.appleSignIn}/>
            </div>
            <label className="login-landing-page__label" for="login-username">
              <input
                className="login-landing-page__input"
                type="text"
                id="login-username"
                placeholder="Username"
                required
                minLength="5"
                maxLength="16"
              />
            </label>
            <label className="login-landing-page__label" for="login-password">
              <input
                className="login-landing-page__input"
                type="password"
                id="login-password"
                placeholder="Password"
                required
                minLength="8"
                maxLength="20"
              />
            </label>
            <ButtonRipple
              className="login-landing-page__link"
              id="sign-in-submit"
            >
              Sign In
            </ButtonRipple>
            <ButtonRipple
              className="login-landing-page__link"
              id="forgot-password"
            >
              Forgot your Password?
            </ButtonRipple>
          </form>
        </div>
        <div className="login-landing-page__toggle-section">
          <div className="login-landing-page__toggle">
            <div className="login-landing-page__toggle-container login-landing-page__toggle-container_left">
              <h1 className="login-landing-page__header">Already with us?</h1>
              <p className="login-landing-page__text">Just sign in here!</p>
              <ButtonRipple className="login-landing-page__link" onClick={removeActive}>
                Sign In
              </ButtonRipple>
            </div>
            <div className="login-landing-page__toggle-container login-landing-page__toggle-container_right">
              <h1 className="login-landing-page__header">New here?</h1>
              <p className="login-landing-page__text">
                Click below to register
              </p>
              <div className="button__container">
              <ButtonRipple className="login-landing-page__link login-landing-page__link_signup" onClick={setActive}>
                Sign Up
              </ButtonRipple>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginLandingPage;
