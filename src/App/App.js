import "./App.css";
import "../Header/Header";
import { Header } from "../Header/Header";
import { ChatRoom } from "../ChatRoom/ChatRoom";
import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { SettingsMenu } from "../SettingsMenu/SettingsMenu";
import { currentColorContext } from "../contexts/CurrentColorTheme";

function App() {

  const [backgroundColor, setBackgroundColor] = React.useState('dark')

  function handleBackgroundThemeChange(){
    backgroundColor === 'dark' ? setBackgroundColor('light') : setBackgroundColor('dark')
  }

  return (
    <div className={`App App_${backgroundColor}`}>
      <currentColorContext.Provider value={{backgroundColor, handleBackgroundThemeChange}}>
        <Header />
        <Routes>
          <Route exact path="/settings" element={<SettingsMenu />} />
        </Routes>
      </currentColorContext.Provider>
    </div>
  );
}

export default App;
