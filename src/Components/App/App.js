import "./App.css";
import { Header } from "../Header/Header";
import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { SettingsMenu } from "../SettingsMenu/SettingsMenu";
import { ChatRoom } from "../ChatRoom/ChatRoom";
import { currentColorContext } from "../../contexts/CurrentColorTheme";
import LoginLandingPage from "../LoginLandingPage/LoginLandingPage";

//connecting firebase
import { initializeApp } from "firebase/app";
import { appConfig } from "../../constants/firebaseconfig";

//starting firebase
const app = initializeApp(appConfig);

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
      <Header />
        <Routes>
          <Route exact path="/settings" element={<SettingsMenu />} />
          <Route exact path="/messages" element={<ChatRoom />} />
        </Routes>
      </currentColorContext.Provider>
    </div>
  );
}

export default App; 
