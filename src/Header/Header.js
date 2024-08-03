import React from "react";
import "./Header.css";
import { NavBar } from "../NavBar/NavBar";


export const Header = () => {
  return (
    <header className="header">
      <div className="header__container-title-toggle">
        <h1 className="header__greeting">Welcome back, BigDongBill!</h1>
      </div>
      <NavBar className="header__navigation" />
    </header>
  );
};
