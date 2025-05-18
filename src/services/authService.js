// import { supabase } from "../client";

import { supabase } from "../supabaseClient";

export const signUp = (email, password) =>
  supabase.auth.signUp({ email, password });

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
};
export const signOut = () => supabase.auth.signOut();

export const getUser = () => supabase.auth.getUser();

export const onAuthStateChange = (callback) =>
  supabase.auth.onAuthStateChange(callback);

export const getUserRole = async (userId) => {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();
      return { role: data?.role, error };
  };

export const signupAsStudent = async ()=>{
  
}