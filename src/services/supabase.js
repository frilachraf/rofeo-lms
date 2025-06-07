// import { supabase } from "../client";

import { supabase } from "../supabaseClient";

export const signUp = (email, password) =>
  supabase.auth.signUp({ email, password });

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
};
export const signOut = () => {
  const {data,error} = supabase.auth.signOut()
};

export const getUser = () => supabase.auth.getUser();

export const onAuthStateChange = (callback) =>
  supabase.auth.onAuthStateChange(callback);

export const getUserRole = async (userId) => {
      const { data, error } = await supabase
        .from('users_roles')
        .select('name')
        .eq('user_id', userId)
        .single();
      return { role: data?.name, error };
  };

export const signupAsStudent = async ()=>{
  
}