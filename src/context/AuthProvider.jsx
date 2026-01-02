import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  //   User Signup With Email and Password
  const userSignup = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   User Signin With Email and Password

  const userSignin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   User Login with Google
  const userLoginWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  // Get Current User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Signout
  const UserSignOut = () => {
    return signOut(auth);
  };

  const value = {
    user,
    setUser,
    loading,
    setLoading,
    userSignup,
    userSignin,
    userLoginWithGoogle,
    UserSignOut,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
