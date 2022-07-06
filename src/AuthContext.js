import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { useLocation } from "react-router-dom";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { constructUser } from "./application/models/user";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState("");

  const location = useLocation();

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function saveUser(id, email, password, username) {
    const userRef = collection(db, "user")
    const path = 'user/' + id
    const newUser = constructUser(username, email, password, path)

    return setDoc(doc(db, path), newUser)
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
      getDoc(doc(db, "user", currentUser.uid)).then((u) => {
        setUser(u.data());
        window.localStorage.setItem('user', JSON.stringify(u.data()));
      })
    });
    return unsubscribe;
  }, [location]);

  return (
    <userAuthContext.Provider value={{ user, signUp, login, logout, setName, saveUser }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
