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
    .eq('teacher_account_id', teacherId)
    // console.log(data)
    .order('created_at', { ascending: false });
    return {data,error}
}

export const getTeacherCourses = async (userId) => {
    const { data, error } = await supabase
        .from('courses')
        .select('*, level:level_id(*)')
        .eq('teacher_account_id', userId)
    return { data, error }
}



export const getTeacherStudentsLast = async (teacherId)=>{
    // from table students courses get all students enrolled in courses of the teacher
    const {data,error} = await supabase.from('enrollments')
    // 
    .select('*,student:students_accounts(*),course:courses(*)')
    .eq('teacher_account_id', teacherId)
    .limit(5)
    console.log(data)
    return {data,error}
}


export const getTeacherEnrollmentsCount = async (teacherId)=>{
    // from table students courses get all students enrolled in courses of the teacher
    const {count, data,error} = await supabase.from('enrollments')
    // 
    .select('*,student:students_accounts(*),course:courses(*)',{count: 'exact'})
    .eq('teacher_account_id', teacherId)
    console.log(count)
    return {count, data,error}
}

export const getTeacherCoursesCount = async (userId) => {
    const {count, data, error } = await supabase
        .from('courses')
        .select('*, level:level_id(*)',{count: 'exact'})
        .eq('teacher_id', userId)
        console.log(count)
    return {count, data, error }
}