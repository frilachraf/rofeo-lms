import React, { createContext, use, useContext, useEffect, useState } from 'react';
import { getUser, getUserRole, onAuthStateChange, signIn, signOut, signUp } from '../services/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role,setRole]=useState()

  useEffect(() => {
    getUser().then(({ data }) => setUser(data?.user ?? null));

    const { data: listener } = onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      fetchRole(session?.user)
    });
    return () => listener.subscription.unsubscribe();
  }, []);
  const fetchRole = async(user)=>{
    const {role} = await getUserRole(user?.id)
    setRole(role)
  }
  const value = {
    user,
    role,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
