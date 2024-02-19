import React, { useState, useContext, useEffect } from 'react';
import {
 getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
   signInWithEmailAndPassword,
   signOut,
   onAuthStateChanged,
} from 'firebase/auth';
import '../firebase';

const AuthContext = React.createContext();
// eslint-disable-next-line import/prefer-default-export

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentuser] = useState();

useEffect(() => {
    const auth = getAuth();
const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentuser(user);
        setLoading(false);
    });
    return unsubscribe;
}, []);
    // signup function
 async function signup(email, password, username) {
const auth = getAuth();
await createUserWithEmailAndPassword(auth, email, password);
     // updating
     await updateProfile(auth.currentUser, {
        displayName: username,
     });
     const user = auth.currentUser;
     setCurrentuser({
        ...user,
     });
}
// login
 function login(email, password) {
    const auth = getAuth();
   return signInWithEmailAndPassword(auth, email, password);
    }
// logout
function logout() {
    const auth = getAuth();
   return signOut(auth);
    }
    const value = {
        currentUser,
        signup,
        login,
        logout,
                   };
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    );
}
