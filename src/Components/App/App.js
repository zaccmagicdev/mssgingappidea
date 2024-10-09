import "./App.css";
import { Header } from "../Header/Header";
import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { SettingsMenu } from "../SettingsMenu/SettingsMenu";
import { ChatRoom } from "../ChatRoom/ChatRoom";
import { currentColorContext } from "../../contexts/CurrentColorTheme";
import LoginLandingPage from "../LoginLandingPage/LoginLandingPage";

//connecting firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { initializeApp } from "firebase/app";
import { appConfig } from "../../constants/firebaseconfig";

//starting firebase
firebase.initializeApp(appConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [backgroundColor, setBackgroundColor] = React.useState("dark");
  const [user] = useAuthState(auth);

  function handleBackgroundThemeChange() {
    backgroundColor === "dark"
      ? setBackgroundColor("light")
      : setBackgroundColor("dark");
  }

  const signInWithGoogle = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <div className={`App App_${backgroundColor}`}>
      <currentColorContext.Provider
        value={{ backgroundColor, handleBackgroundThemeChange }}
      >
        {user ? (
          <>
            <Header username={user.displayName} avatar={user.photoURL}/>
            <Routes>
              <Route exact path="/settings" element={<SettingsMenu auth={auth}/>} />
              <Route exact path="/messages" element={<ChatRoom />} />
            </Routes>
          </>
        ) : (
          <>
            <LoginLandingPage googleSignIn={signInWithGoogle}/>
          </>
        )}
      </currentColorContext.Provider>
    </div>
  );
}

export default App;
