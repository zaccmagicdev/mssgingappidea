import { React, useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const buttonData = [
    { name: "Messages", value: "messages" },
    { name: "Groups", value: "groups" },
    { name: "NewsFeed", value: "newsfeed" },
    { name: "Settings", value: "settings" },
  ];

  const [isClicked, setIsClicked] = useState("");

  function handleClick(e) {
    setIsClicked(e.target.name);
  }

  return (
    <div className="navbar">
      {buttonData.map((button, i) => {
        const className =
          isClicked === button.name ? "navbar__tab-selected-light" : "";
        return (
          <Link to={button.value} key={i}>
          <button
            className={`navbar__tab ${className}`}
            name={button.name}
            value={button.value}
            onClick={handleClick}
          >
            {button.name}
          </button>
          </Link>
        );
      })}
    </div>
  );
};
