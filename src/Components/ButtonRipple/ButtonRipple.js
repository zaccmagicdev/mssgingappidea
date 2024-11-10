import React from "react";
import './ButtonRipple.css';

import { currentColorContext } from "../../contexts/CurrentColorTheme";

export default function ButtonRipple({
  onClick,
  type,
  id,
  className,
  ripple,
  children,
  style,
}) {
  const { backgroundColor } = React.useContext(currentColorContext);
  React.useEffect(() => {
    const rbuttons = document.querySelectorAll(".rbutton_ripple");
    rbuttons.forEach((rbutton) => {
      rbutton.onclick = ({ pageX, pageY, currentTarget }) => {
        let x =
          ((pageX - currentTarget.offsetLeft) * 100) /
          currentTarget.offsetWidth;
        let y =
          ((pageY - currentTarget.offsetTop) * 100) /
          currentTarget.offsetHeight;
        const ripple = document.createElement("span");
        const rippleColor = rbutton.dataset.ripple || "gray";
        ripple.classList.add("ripple-effect");
        ripple.style.background = rippleColor;

        rbutton.appendChild(ripple);
        ripple.style.left = x
        ripple.style.top = y

        setTimeout(() => {
          ripple.remove();
        }, 300);
      };
    });
  }, []);

  return (
    <button
      type={type ? type : "button"}
      id={id}
      className={`rbutton rbutton_${backgroundColor} rbutton_ripple ${className ? className : ""}`}
      rippleData={ripple}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}
