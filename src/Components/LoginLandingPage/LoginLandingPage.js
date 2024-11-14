//imports
import React from "react";
import "./LoginLandingPage.css";
import ButtonRipple from "../ButtonRipple/ButtonRipple";
import {
  INITIAL_FORM_STATE,
  LoginLandingPageReducer,
} from "./LoginLandingPageReducer";
import ForgotPasswordForm from "../ForgotPasswordForm/ForgotPasswordForm";

function LoginLandingPage(props) {
  const [activeState, setActiveState] = React.useState("");
  const [forgotPasswordActivated, activateForgetPasswordForm] =
    React.useState(false);
  const [state, dispatch] = React.useReducer(
    LoginLandingPageReducer,
    INITIAL_FORM_STATE
  );
  const errorRef = React.useRef("");

  function handleChange(e) {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  }

  function handleSubmit(e) {
    dispatch({
      type: "SUBMIT_METHOD",
      payload:
        e.target.parentElement.classList[1] ===
        "login-landing-page__form_register"
          ? {
              submitMethod: props.handleSignUpSubmit(
                state.username,
                state.email,
                state.password
              ),
            }
          : {
              submitMethod: props.handleSignInSubmit(
                state.email,
                state.password
              ),
            },
    });
  }

  function handleGoogleSignIn() {
    dispatch({
      type: "SUBMIT_METHOD_GOOGLE",
      payload: props.googleSignIn(),
    });
  }

  function setActive() {
    setActiveState("active");
  }

  function removeActive() {
    setActiveState("");
  }

  function returnToForm() {
    activateForgetPasswordForm(false);
  }

  React.useEffect(() => {
    if (errorRef.current != "" || errorRef.current != undefined) {
     errorRef.current.classList.add('login-landing-page__error_active')
    }
  }, [props.loginLandingPageErrProp]);

  return (
    <section className="login-landing-page__background">
      {forgotPasswordActivated ? (
        <div className="login-landing-page__container login-landing-page__container__forgotpassword">
          <ForgotPasswordForm
            emailSubmissionMethod={props.handleResetPassword}
            returnCallback={returnToForm}
          />
        </div>
      ) : (
        <div className={`login-landing-page__container ${activeState}`}>
          <div className="login-landing-page__section login-landing-page__section_register">
            <form className="login-landing-page__form login-landing-page__form_register">
              <h1 className="login-landing-page__header">Create Account</h1>
              <p className="login-landing-page__text">
                You can also create an account through
              </p>

              <button
                className="login-landing-page__link login-landing-page__external-link login-landing-page__google-link"
                type="button"
                onClick={handleGoogleSignIn}
              >
                Google
              </button>
              <span ref={errorRef} className="login-landing-page__error">
                {props.loginLandingPageErrProp}
              </span>
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
                  minLength="2"
                  maxLength="30"
                  name="username"
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label
                className="login-landing-page__label"
                for="register-username"
              >
                <input
                  className="login-landing-page__input"
                  type="text"
                  id="register-email"
                  placeholder="Email"
                  required
                  minLength="4"
                  maxLength="35"
                  name="email"
                  onChange={(e) => handleChange(e)}
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
                  name="password"
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <ButtonRipple
                onClick={(e) => {
                  handleSubmit(e);
                }}
                className="login-landing-page__link"
                id="register-submit"
              >
                Sign Up
              </ButtonRipple>
            </form>
          </div>
          <div className="login-landing-page__section login-landing-page__section_login">
            <h1 className="login-landing-page__header">Welcome back!</h1>
            <p className="login-landing-page__other-options-text">
              You can also sign in through
            </p>
            <button
              className="login-landing-page__link login-landing-page__external-link login-landing-page__google-link"
              type="button"
              onClick={handleGoogleSignIn}
            >
              Google
            </button>
            <form className="login-landing-page__form login-landing-page__form_sign-in">
              <label className="login-landing-page__label" for="login-username">
                <input
                  className="login-landing-page__input"
                  type="text"
                  id="login-username"
                  placeholder="Email"
                  required
                  minLength="5"
                  maxLength="35"
                  name="email"
                  onChange={(e) => handleChange(e)}
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
                  name="password"
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <ButtonRipple
                onClick={(e) => {
                  handleSubmit(e);
                }}
                className="login-landing-page__link"
                id="sign-in-submit"
              >
                Sign In
              </ButtonRipple>
              <ButtonRipple
                className="login-landing-page__link"
                id="forgot-password"
                onClick={() => {
                  activateForgetPasswordForm(true);
                }}
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
                <ButtonRipple
                  className="login-landing-page__link"
                  onClick={removeActive}
                >
                  Sign In
                </ButtonRipple>
              </div>
              <div className="login-landing-page__toggle-container login-landing-page__toggle-container_right">
                <h1 className="login-landing-page__header">New here?</h1>
                <p className="login-landing-page__text">
                  Click below to register
                </p>
                <div className="button__container">
                  <ButtonRipple
                    className="login-landing-page__link login-landing-page__link_signup"
                    onClick={setActive}
                  >
                    Sign Up
                  </ButtonRipple>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default LoginLandingPage;
