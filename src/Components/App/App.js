import "./App.css";
import { Header } from "../Header/Header";
import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { SettingsMenu } from "../SettingsMenu/SettingsMenu";
import { ChatRoom } from "../ChatRoom/ChatRoom";
import { currentColorContext } from "../../contexts/CurrentColorTheme";
import LoginLandingPage from "../LoginLandingPage/LoginLandingPage";

//connecting firebase
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
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
  let [user] = useAuthState(auth);
  const [username, setUsername] = React.useState(null);
  const [ avatar, setAvatar ] = React.useState(null)
  console.log(user);

  function handleBackgroundThemeChange() {
    backgroundColor === "dark"
      ? setBackgroundColor("light")
      : setBackgroundColor("dark");
  }

  //Auth Methods
  function signInFormMethod(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        user = userCredential.user;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function signUpFormMethod(username, email, password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setUsername(username)
        user = userCredential.user;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  auth.onAuthStateChanged((user) => {
   user && (user.updateProfile({displayName: username, avatar: avatar})
   .catch(err => console.error(err)))
  });

  React.useEffect(() => {
    user && (setUsername(user.displayName))
  }, [user])

  //app
  return (
    <div className={`App App_${backgroundColor}`}>
      <currentColorContext.Provider
        value={{ backgroundColor, handleBackgroundThemeChange }}
      >
        {user ? (
          <>
            <Header username={username} avatar={user.photoURL} />
            <Routes>
              <Route
                exact
                path="/settings"
                element={<SettingsMenu auth={auth} />}
              />
              <Route
                exact
                path="/messages"
                element={<ChatRoom firestore={firestore} />}
              />
            </Routes>
          </>
        ) : (
          <>
            <LoginLandingPage
              googleSignIn={signInWithGoogle}
              handleSignUpSubmit={signUpFormMethod}
              handleSignInSubmit={signInFormMethod}
            />
          </>
        )}
      </currentColorContext.Provider>
    </div>
  );
}

export default App;
