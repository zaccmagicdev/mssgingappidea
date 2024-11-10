import "./App.css";
import { Header } from "../Header/Header";
import * as React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { SettingsMenu } from "../SettingsMenu/SettingsMenu";
import { ChatRoom } from "../ChatRoom/ChatRoom";
import { currentColorContext } from "../../contexts/CurrentColorTheme";
import LoginLandingPage from "../LoginLandingPage/LoginLandingPage";

import { generateFromString } from "generate-avatar";
//connecting firebase
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { appConfig } from "../../constants/firebaseconfig";

import {
  INITIAL_FORM_STATE,
  LoginLandingPageReducer,
} from "../LoginLandingPage/LoginLandingPageReducer";

//starting firebase
firebase.initializeApp(appConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [backgroundColor, setBackgroundColor] = React.useState("dark");
  //let user = auth.currentUser;
  let [user] = useAuthState(auth);
  const [username, setUsername] = React.useState(null);
  const [avatar, setAvatar] = React.useState("");

  const navigate = useNavigate();

  function handleBackgroundThemeChange() {
    backgroundColor === "dark"
      ? setBackgroundColor("light")
      : setBackgroundColor("dark");
  }

  function setProfileData(username, avatar) {
    setUsername(username);
    setAvatar(avatar);
  }

  function renderAvatar(avatar) {
    if (avatar.includes("svg")) {
      return `data:image/svg+xml;utf8,${avatar}`;
    } else {
      return avatar;
    }
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
        console.log(error);
      })
      .finally(() => {
        //force re-render
        setProfileData(user.displayName, user.photoURL);
      });
  }

  function signUpFormMethod(username, email, password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        user = userCredential.user;
        setProfileData(username, generateFromString(email));
      })
      .then(() => {
        user.updateProfile({
          displayName: username,
          photoURL: generateFromString(email),
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        console.log(user);
        navigate("/messages");
      });
  }

  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        user = result.user;
        setProfileData(user.displayName, user.photoURL);
      })
      .catch((err) => console.error(err));
  }

  function resetPassword(email) {
    console.log(state);
    auth.sendPasswordResetEmail(email).catch((error) => {
      console.error(error);
    });
  }

  function handleSignOut() {
    auth
      .signOut()
      .then(() => {
        setProfileData(null, null);
      })
      .catch((err) => console.error(err));
  }

  React.useEffect(() => {
    user &&
      auth.onAuthStateChanged((currentUser) => {
        if (currentUser) {
          user = currentUser;
          console.log(currentUser);
          setProfileData(user.displayName, user.photoURL);
        }
      });
  }, []);

  React.useEffect(() => {
    user && setProfileData(user.displayName, user.photoURL);
  }, [user]);

  const [state, dispatch] = React.useReducer(
    LoginLandingPageReducer,
    INITIAL_FORM_STATE
  );

  //app
  return (
    <div className={`App App_${backgroundColor}`}>
      <currentColorContext.Provider
        value={{ backgroundColor, handleBackgroundThemeChange }}
      >
        {user ? (
          <>
            <Header username={username} avatar={renderAvatar(avatar)} />
            <Routes>
              <Route
                exact
                path="/settings"
                element={
                  <SettingsMenu
                    signOutMethod={handleSignOut}
                    auth={auth}
                    user={user}
                  />
                }
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
              handleResetPassword={resetPassword}
            />
          </>
        )}
      </currentColorContext.Provider>
    </div>
  );
}

export default App;
