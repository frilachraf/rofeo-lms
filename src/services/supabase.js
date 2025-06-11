// import { supabase } from "../client";

import { supabase } from "../supabaseClient";

export const signUp = async (email, password, userData) => {
  try {
    // 1. Créer l'utilisateur dans l'authentification
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    // Ensure the user object is fully available and committed
    // This might not be strictly necessary if auth.signUp is always synchronous in terms of user ID availability,
    // but in case of subtle race conditions, it could help by forcing a microtask queue flush.
    const { data: { user }, error: getUserError } = await supabase.auth.getUser();

    if (getUserError || !user) {
      // If fetching user fails, or user is not found, something is wrong
      throw new Error("User not found after signup authentication.");
    }

    const userId = user.id; // Use the fetched user ID

    // 2. Insérer le rôle de l'utilisateur dans la table users_roles
    const { error: roleError } = await supabase
      .from('users_roles')
      .insert([
        {
          user_id: userId,
          name: userData.role,
        },
      ]);

    if (roleError) throw roleError;

    // 3. Insérer les données spécifiques selon le rôle
    if (userData.role === 'student') {
      const { error: studentAccountError } = await supabase
        .from('students_accounts')
        .insert([
          {
            id: userId,
            full_name: userData.full_name,
            level: userData.level,
            school: userData.school,
            avatar: userData.avatar || null,
          },
        ]);

      if (studentAccountError) throw studentAccountError;
    } else if (userData.role === 'teacher') {
      const { error: teacherAccountError } = await supabase
        .from('teachers_accounts')
        .insert([
          {
            id: userId,
            full_name: userData.full_name,
            bio: userData.bio,
            expertise: userData.expertise,
            avatar: userData.avatar || null,
          },
        ]);

      if (teacherAccountError) throw teacherAccountError;
    }

    return { data: authData, error: null };
  } catch (error) {
    console.error('Error in signUp:', error);
    return { data: null, error };
  }
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
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

export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { profile: data, error };
};

export const getStudentProfile = async (userId) => {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('user_id', userId)
    .single();
  return { studentProfile: data, error };
};

export const getTeacherProfile = async (userId) => {
  const { data, error } = await supabase
    .from('teachers')
    .select('*')
    .eq('user_id', userId)
    .single();
  return { teacherProfile: data, error };
};

export const signupAsStudent = async ()=>{
  
}