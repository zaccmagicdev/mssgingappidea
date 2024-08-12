import React from "react";
import "./Message.css";

export const Message = (props) => {
  const currentDate = new Date(Date.now()).toString();

  return (
    <li className="message">
      <div className="message__container">
        <img
          className="message__profile-picture"
          src={props.ProfileURL}
          alt="Profile Image"
        />
        <p className="message__username">
          {props.Username}
          <span className="message__timestamp">
            Today at {currentDate.substring(15, 21)}
          </span>
        </p>
        <p className="message__content">{props.MessageContent}</p>
      </div>
    </li>
  );
};
