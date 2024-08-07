import React from "react";

export default function ButtonRipple({
  onClick,
  type,
  id,
  className,
  ripple,
  children,
  style
}) {

  React.useEffect(() => {
    const ripples = document.querySelectorAll(".rbutton_ripple")
    ripples.forEach((ripple) => {
        ripple.onclick = ({pageX, pageY, currentTarget}) => {
            console.table(pageX, pageY, currentTarget)
        }
    })
  })  

  return (
    <button
      type={type ? type : "button"}
      id={id}
      className={`rbutton rbutton_ripple ${className ? className : ""}`}
      rippleData={ripple}
      onClick={onClick}
      style={style}
    >{children}</button>
  );
}
