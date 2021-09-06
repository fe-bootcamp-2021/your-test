import React, { useContext, useState, useEffect } from "react";
// eslint-disable-next-line import/no-named-as-default
import { auth } from "../libs/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  async function signup(email, password) {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      throw new Error(error);
    }
  }

  // async function checkIfSignedIn() {
  //   await auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       return true;
  //     }
  //     return false;
  //   });
  // }

  function signOut() {
    auth.signOut();
  }

  async function signIn(username, password) {
    try {
      await auth.signInWithEmailAndPassword(username, password);
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    signOut,
    signIn,
    // checkIfSignedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
