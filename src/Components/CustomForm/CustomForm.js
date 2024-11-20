import React from "react";
import "./CustomForm.css";
import ButtonRipple from "../ButtonRipple/ButtonRipple";

function CustomForm(props) {
  const errorRef = React.useRef("");

  return (
    <form
      className={`login-landing-page__form login-landing-page__form_${props.formName}`}
      type="submit"
    >
      {props.children}
      <span ref={errorRef} className="login-landing-page__error">
        {props.errorProp}
      </span>
      <ButtonRipple
        onClick={(e) => {
          e.preventDefault();
          props.submitFunction(e);
        }}
        className="login-landing-page__link"
        id={`${props.formName}-submit`}
      >
       {props.submitButtonName}
      </ButtonRipple>
    </form>
  );
}

export default CustomForm;
