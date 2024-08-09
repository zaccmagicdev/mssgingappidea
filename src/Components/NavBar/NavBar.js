import { React, useState, useContext } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { currentColorContext } from "../../contexts/CurrentColorTheme";

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

  const { backgroundColor } = useContext(currentColorContext)
  return (
    <div className="navbar">
      {buttonData.map((button, i) => {
        const className =
          isClicked === button.name ? `navbar__tab-selected-${backgroundColor}` : "";
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
