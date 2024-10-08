import React from "react";
import "./Header.css";
import { NavBar } from "../NavBar/NavBar";


export const Header = (props) => {

 console.log(props.avatar)
  
  return (
    <header className="header">
      <div className="header__container-title-toggle">
        <h1 className="header__greeting">Welcome back, {props.username}!</h1>
        <img src={props.avatar} alt='Profile Avatar' />
      </div>
      <NavBar className="header__navigation" />
    </header>
  
)};
