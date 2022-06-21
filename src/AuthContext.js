import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";
import { useLocation } from "react-router-dom";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState("");

  const location = useLocation();

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function setName(uname) {
    return updateProfile(auth.currentUser, { displayName: uname });
  }

  function logout() {
    localStorage.removeItem("user")
    return signOut(auth);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      window.localStorage.setItem('user', JSON.stringify(currentUser));
    });
    return unsubscribe;
  }, [location]);

  return (
    <userAuthContext.Provider value={{ user, signUp, login, logout, setName }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
