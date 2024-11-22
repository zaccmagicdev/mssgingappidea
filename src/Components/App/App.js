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
import { updateProfile } from "firebase/auth";
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
  //let processedAvatar;
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
      if (avatar.includes("<")) {
        return `data:image/svg+xml;utf8,${avatar}`;
      } else {
        return avatar;
      }
    }
  }

  console.log(user);

  function deleteAccount() {
    user.delete().catch((error) => console.error(error));
  }

  function editProfileInformation(newUsername, newAvatar) {
    auth.currentUser
      .updateProfile({
        displayName: newUsername,
        photoURL: newAvatar,
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setProfileData(newUsername, newAvatar);
      });
  }

  //Auth Methods
  function signInFormMethod(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        setLandingPageError(error);
      })
      .finally(() => {
        //force re-render
        setProfileData(user.displayName, renderAvatar(user.photoURL));
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
          console.log(error);
          setLandingPageError(error);
        })
        .finally(() => {
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
      })
      .catch((err) => console.error(err))
      .finally(() => {
        const processedAvatar = renderAvatar(user.photoURL);
        setProfileData(user.displayName, processedAvatar);
      });
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

  //auth persistence
  React.useEffect(() => {
    user != null &&
      //find a way to call renderAvatar before initial render
      setProfileData(user.displayName, renderAvatar(user.photoURL));
    //setting new information when there is a new user detected
    auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        user = auth.currentUser;
        const processedAvatar = renderAvatar(user.photoURL);
        setProfileData(user.displayName, processedAvatar);
      } else {
        setProfileData(null, "");
      }
    });
  }, []);

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
                    handleUpdateProfile={editProfileInformation}
                    deleteAccountProp={deleteAccount}
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
