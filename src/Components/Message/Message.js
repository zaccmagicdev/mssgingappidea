import React from "react";
import "./Message.css";

export const Message = (props) => {

  return (
    <li className="message">
      <div className="message__container" style={{backgroundColor: props.color}}>
        <p>{props.username}</p>
        <img
          className="message__profile-picture"
          src={props.ProfileURL}
          alt="Profile Image"
        />
        <p className="message__username">
          {props.Username}
          <span className="message__timestamp">
            Today at {props.currentDate}
          </span>
        </p>
        <p className="message__content">{props.MessageContent}</p>
      </div>
    </li>
  );
};
