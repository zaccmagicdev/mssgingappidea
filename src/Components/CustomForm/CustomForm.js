import React from "react";
import "./CustomForm.css";

function CustomForm() {
  const errorRef = React.useRef("");

  return (
    <form
      className={`login-landing-page__form login-landing-page__form_${props.formName}`}
    >
      {props.children}
      <span ref={errorRef} className="login-landing-page__error">
        {props.errorProp}
      </span>
    </form>
  );
}

export default CustomForm;
