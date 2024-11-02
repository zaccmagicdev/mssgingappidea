import React from "react";
import ChatBox from "../ChatBox/ChatBox";
import Arrow from "../../vendor/icons/arrow-right-solid.svg";

import {
  INITIAL_FORM_STATE,
  LoginLandingPageReducer,
} from "../LoginLandingPage/LoginLandingPageReducer";

function ForgotPasswordForm(props) {
  const [emailSent, setEmailSent] = React.useState(false);

  const [state, dispatch] = React.useReducer(
    LoginLandingPageReducer,
    INITIAL_FORM_STATE
  );

  console.log(state)

  /*function handleSendEmail(email) {
    props.emailSubmissionMethod(email);
    setEmailSent(true);
  }*/

  function handleChange(e) {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  }

  return (
    <section className="forgotpassword__form">
      {emailSent ? (
        <>
          <h1 className="forgotpassword__title">Request Sent!</h1>
          <p>Check for a popup about resetting your email</p>
        </>
      ) : (
        <>
          <h1 className="forgotpassword__title">Password Reset</h1>
          <p>
            Enter in your email and this will redirect you to reset your
            password
          </p>
          <ChatBox
            placeholder={"Enter Email Address"}
            submitIcon={Arrow}
            submitMethod={(email) => {props.emailSubmissionMethod(email)}}
            handleOnChange={(e) => {handleChange(e)}}
            name='resetEmail'
          />
        </>
      )}
    </section>
  );
}

export default ForgotPasswordForm;
