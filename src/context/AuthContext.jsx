import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, provider } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import {setDoc,doc} from 'firebase/firestore'

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

 async function signUp(email, password) {
    try {
      // Create the user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
  
      // After successful creation, create the document with savedShows
      await setDoc(doc(db, 'users', email), {
        savedShows: []
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }
  const handleGoogle =  (user) => {
    return signInWithPopup(auth, provider)
       
       .then((response) => {
         return setDoc(doc(db, "users", `${response.user.email}`), {
           savedShows: [],
         });
       })
       .then(() => console.log("Success"))
   };
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut,handleGoogle, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}