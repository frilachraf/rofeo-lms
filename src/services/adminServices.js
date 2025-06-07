// analytics
import { supabase } from "../supabaseClient";

export const getTeachersCount = () => { }


// teacher
export const createTeacher = async (extractedData) => {
  // create teacher auth 
  const {data: userAuth ,error: userAuthError } = await supabase.auth.signUp({ email:extractedData.email, password : extractedData.password });
  // creat techer account
  const {data: techerAccount ,error: teacherAccountError } = await supabase
  .from('teachers_accounts')
  .insert({
    full_name: extractedData.full_name,
    bio: extractedData.bio,
    avatar: `https://avatar.iran.liara.run/public/boy?username=${extractedData.full_name}`,
    id: userAuth.user.id,
  }).select('*')
  // create role
  await supabase.from('users_roles').insert({
    user_id: userAuth.user.id,
    name: 'teacher',
  })
  return {userAuth}
  
}
export const getTeachers = async () => {
  const {data, error} = await supabase
  .from('teachers_accounts')
  .select('*, courses(id)')
  if(error){
    console.log(error)
  }
  return {data, error}
}
export const getTeacher = () => { }
// students
export const getStudents = () => { }
export const getStudent = () => { }
// courses
export const getCourses = () => { }
export const getAllCourses = async () => {
  const {data, error} = await supabase
  .from('courses')
  .select('*, teacher:teachers_accounts(full_name,avatar), enrollments(id)')
  if(error){
    console.log(error)
  }
  return {data, error}
  // return supabase.from('courses').select('*')
}
export const getCourse = () => { }

export const getCoursesCount = async () => {
    const { count, error } = await supabase.from('courses')
        .select("*", { count: 'exact' })
    return { count, error }
}
export const getStudentsCount = async () => {
    const { count, error } = await supabase.from('students_accounts')
        .select("*", { count: 'exact' })
    return { count, error }
}
export const getTodayEnrollmentsCount = async () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Set time to 00:00:00

    const { count, error } = await supabase
        .from('enrollments')
        .select('*', { count: 'exact' })
        .gte('created_at', today.toISOString())
    return { count, error }
}

export const getTotalEnrollmentsPerDay = async () => {
    const now = new Date()
  const pastWeek = new Date()
  pastWeek.setDate(now.getDate() - 6)

  const { data, error } = await supabase
    .from('enrollments')
    .select('created_at')
    .gte('created_at', pastWeek.toISOString())

  if (error) {
    console.error('Error fetching enrollments:', error)
    return []
  }

  // Prepare empty counts
  const result = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(pastWeek)
    date.setDate(pastWeek.getDate() + i)
    const key = date.toISOString().split('T')[0]
    result.push({ date: key, total: 0 })
  }

  // Count enrollments
  data.forEach(row => {
    const date = row.created_at.split('T')[0]
    const dayData = result.find(d => d.date === date)
    if (dayData) dayData.total += 1
  })
    // return result
    return { data : result}
}

