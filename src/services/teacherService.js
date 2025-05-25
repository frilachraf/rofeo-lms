import { supabase } from "../supabaseClient";

export const createTeacherAccount = async ()=>{

}

export const getTeacherAccountById = async (userId)=>{
    const {data,error} = await supabase.from('teachers_accounts')
    .select('*')
    .eq('id', userId)
    .single();
    return {data,error}
}
export const editTeacherAccount = async ()=>{

}
export const getAllTeachers = async ()=>{

}
export const blockTeacherAccount = async ()=>{

}
export const unBlockTeacherAccount = async ()=>{

}

export const getTeacherStudents = async (teacherId)=>{
    // from table students courses get all students enrolled in courses of the teacher
    const {data,error} = await supabase.from('enrollments')
    // 
    .select('*,student:students_accounts(*),course:courses(*)')
    .eq('teacher_id', teacherId)
    return {data,error}
}
