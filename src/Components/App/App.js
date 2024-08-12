import "./App.css";
import { Header } from "../Header/Header";
import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { SettingsMenu } from "../SettingsMenu/SettingsMenu";
import { currentColorContext } from "../../contexts/CurrentColorTheme";
import LoginLandingPage from "../LoginLandingPage/LoginLandingPage";

function App() {
  const [backgroundColor, setBackgroundColor] = React.useState("dark");

  function handleBackgroundThemeChange() {
    backgroundColor === "dark"
      ? setBackgroundColor("light")
      : setBackgroundColor("dark");
  }

  return (
    <div className={`App App_${backgroundColor}`}>
      <currentColorContext.Provider
        value={{ backgroundColor, handleBackgroundThemeChange }}
      >
      <LoginLandingPage />
        <Routes>
          <Route exact path="/settings" element={<SettingsMenu />} />
        </Routes>
      </currentColorContext.Provider>
    </div>
  );
}

export default App;