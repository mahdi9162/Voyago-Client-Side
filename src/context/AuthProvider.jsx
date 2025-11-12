import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { createContext, useState } from 'react';
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

  //   User Login with Google
  const userLoginWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  const value = {
    user,
    setUser,
    loading,
    setLoading,
    userSignup,
    userLoginWithGoogle,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
