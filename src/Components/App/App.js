//imports
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
import { BLACKLISTED_WORDS } from "../../constants/constants";

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
  const [landingPageError, setLandingPageError] = React.useState({});

  const navigate = useNavigate();

  function checkForProfanity(string) {
    const lowerCase = string.toLowerCase();
    return BLACKLISTED_WORDS.some((str) =>
      lowerCase.includes(str.toLowerCase())
    );
  }

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
    if (avatar !== null) {
      if (avatar.includes("svg")) {
        return `data:image/svg+xml;utf8,${avatar}`;
      } else {
        return avatar;
      }
    }
  }

  console.log(user)
  
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
    if (checkForProfanity(username)) {
      setLandingPageError(
        new Error("Please enter in a more appropriate username")
      );
    } else {
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
          console.log(error)
          setLandingPageError(error)
        })
        .finally(() => {
          console.log(user);
          Object.keys(landingPageError).length !== 0 && setLandingPageError({});
          navigate("/messages");
        });
    }
  }

  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        user = result.user;
        user.updateProfile({
          displayName: username,
          photoURL: generateFromString(user.email),
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setProfileData(user.displayName, user.photoURL));
  }

  function resetPassword(email) {
    auth.sendPasswordResetEmail(email).catch((error) => {
      console.error(error);
    });
  }

  function handleSignOut() {
    auth
      .signOut()
      .then(() => {
        setProfileData(null, "");
      })
      .catch((err) => console.error(err));
  }

  // |
  // |
  // |
  // V auth state changed not triggering - fix this first!!
  React.useEffect(() => {
    user != null &&
    setProfileData(user.displayName, renderAvatar(user.photoURL));
      auth.onAuthStateChanged((currentUser) => {
        console.log('this worked')
        if (currentUser) {
          user = currentUser;
          setProfileData(currentUser.displayName, renderAvatar(currentUser.photoURL));
        } else {
          setProfileData(null, "");
        }
      });
  }, []);

  const [state] = React.useReducer(LoginLandingPageReducer, INITIAL_FORM_STATE);

  //app
  return (
    <div className={`App App_${backgroundColor}`}>
      <currentColorContext.Provider
        value={{ backgroundColor, handleBackgroundThemeChange }}
      >
        {user ? (
          <>
            <Header username={username} avatar={avatar} />
            <Routes>
              <Route
                exact
                path="/settings"
                element={
                  <SettingsMenu
                    signOutMethod={handleSignOut}
                    auth={auth}
                    user={user}
                    avatar={avatar}
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
              loginLandingPageErrProp={landingPageError.message}
            />
          </>
        )}
      </currentColorContext.Provider>
    </div>
  );
}

export default App;
