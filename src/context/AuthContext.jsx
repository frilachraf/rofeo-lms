import React, { createContext, use, useContext, useEffect, useState } from 'react';
import { getUser, getUserRole, onAuthStateChange, signIn, signOut, signUp } from '../services/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data } = await getUser();
        console.log('user:',data)
        const currentUser = data?.user ?? null;
        setUser(currentUser);
        
        if (currentUser?.id) {
          const { role: userRole } = await getUserRole(currentUser.id);
          setRole(userRole);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: listener } = onAuthStateChange(async (event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (currentUser?.id) {
        const { role: userRole } = await getUserRole(currentUser.id);
        setRole(userRole);
      } else {
        setRole(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);
  
  const value = {
    user,
    role,
    loading,
    signIn,
    signUp,
    signOut,
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
