import { supabase } from "../supabaseClient";

export const createStudentAccount = async ()=>{

}

export const getStudentAccountById = async ()=>{
    
}
export const editStudentAccount = async ()=>{

}

export const getStudentEnrollment = async (enrollmentId,studentId)=>{
    const { data, error } = await supabase
        .from('enrollments')
        .select('*,course:courses(*,lessons(*)),teacher:teachers_accounts(*),enrollment_progress(*)')
        .eq('id', enrollmentId)
        .eq('student_account_id', studentId)
        .single();
    return { data, error };
}

export const getStudentEnrollmentProgress = async (enrollmentId,studentId)=>{
    const { data, error } = await supabase
        .from('enrollment_progress')
        .select('*')
        .eq('enrollment_id', enrollmentId)
        .eq('student_id', studentId)
        .single();
    console.log('getStudentEnrollmentProgress', data);
    return { data, error };
}
