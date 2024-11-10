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

  console.log(state.resetEmail)

  function handleSendEmail() {
    dispatch({
      type: "SUBMIT_METHOD_RESET",
      payload: props.emailSubmissionMethod(state.resetEmail),
    });
    setEmailSent(true);
  }

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
          <p>We sent you an email that will redirect you to reset your password! If you don't see it immediately in your inbox then please check your inbox</p>
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
            submitMethod={() => {handleSendEmail()}}
            handleOnChange={(e) => {handleChange(e)}}
            name='resetEmail'
          >
            <button type="button" className="forgotpassword__return" onClick={props.returnCallback} />
          </ChatBox>
        </>
      )}
    </section>
  );
}

export default ForgotPasswordForm;
