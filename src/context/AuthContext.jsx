import { createContext, useContext, useEffect, useState } from "react";
import { auth,db, provider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { setDoc,doc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);
    setDoc(doc(db,"users",email) ,{
      savedShows:[]
    })
  };
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };
  const handleGoogle =  (user) => {
   return signInWithPopup(auth, provider)
      
      .then((response) => {
        return setDoc(doc(db, "users", `${response.user.email}`), {
          savedShows: [],
        });
      })
      .then(() => console.log("Success"))
  };
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
  <AuthContext.Provider value={{signUp,logIn,logout,handleGoogle,user}}>
      {children}
  </AuthContext.Provider>
    )
    ;
}

export function UserAuth() {
  return useContext(AuthContext);
}
