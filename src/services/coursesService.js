import { supabase } from "../supabaseClient";

const COURSE_TABLE = "courses"
const CATEGORY_TABLE = "course_categories"
const ENROLLMENT_TABLE = "enrollments"


const getAllCourses = async () => {
    const { data, error } = await supabase
        .from('courses')
        .select('*')
    return { data, error }
}

const getFilteredCourses = async ({ categoryId, searchTerm, sortBy = 'created_at' }) => {
  console.log(categoryId)
//   console.log(searchTerm)
//   console.log(sortBy)

  let query = supabase
        .from('courses')
        .select(`
            id,
            title,
            description,
            total_enrollments,
            status,
            duration,
            image_url,
            created_at,
            category:category_id (
              id,
              name
            ),
            teacher:teacher_id (
              user_id,
              full_name
            )
          `)
        

    // Apply categoryId filter if provided
    if (categoryId) {
        query = query.eq('category_id', categoryId)
    }

    // // Apply search filter if provided
    // if (searchTerm) {
    //     query = query.ilike('title', `%${searchTerm}%`)
    // }

    // Apply sorting
    // query = query.order(sortBy, { ascending: false })

    const { data, error } = await query
    return { data, error }
}

// approved by me
const getCategories = async () => {
    const { data, error } = await supabase
        .from('course_categories')
        .select('*')
    return { data, error }
}

// approved by me
const getCoursesLimit = async (limit) => {
    const { data, error } = await supabase
        .from('courses')
        .select('*, category:course_categories(*), teacher:teacher_id(*)', { count: 'exact' })
        .limit(limit)
    return { data, error }
}

// approved by me
const getStudentCourses = async (userId) => {
    const { data, error } = await supabase
        .from('enrollments')
        .select('*, courses(*, course:course_categories(*))')
        .eq('student_id', userId)
    return { data, error }
}

// approved by me
const getTeacherCourses = async (userId) => {
    const { data, error } = await supabase
        .from('courses')
        .select('*, category:course_categories(*)')
        .eq('teacher_id', userId)
    return { data, error }
}

// approved by me
const getCourseById = async (courseId) => {
    const { data, error } = await supabase
        .from('courses')
        .select('*, category:course_categories(*), teacher:teacher_id(*),lessons(*)')
        .eq('id', courseId)
    return { data, error }
}

// approved by me
const enrollCourse = async (userId, courseId, progress) => {
    const { data, error } = await supabase
        .from('enrollments')
        .insert({ student_id: userId, course_id: courseId , progress: progress })
        .select("*")
    return { data, error }
}

// approved by me
const unenrollCourse = async (userId, courseId) => {
    const { data, error } = await supabase
        .from('enrollments')
        .delete()
        .eq('student_id', userId)
        .eq('course_id', courseId)
        .select("*")
    return { data, error }
}
const updateCourseEnrollmentProgress = async (userId, courseId) => {
    const { data, error } = await supabase
        .from('enrollments')
        .update({ 
            progress: supabase.rpc('increment', {
                x: 1,
                column: 'progress'
            })
        })
        .eq('student_id', userId)
        .eq('course_id', courseId)
        .select('*')
    
    return { data, error }
}


export const createCourse= async (teacherId,extractedData)=>{
    const { data, error } = await supabase
      .from('courses')
      .insert([
        {
            id:9,
          title:extractedData.title,
          description:extractedData.description,
        //   total_enrollments: total_enrollments || 0, // Default to 0 if not provided
        //   status: status || 'draft', // Default to 'draft' if not provided
          duration:extractedData.duration,
          image_url:extractedData.image_url,
        //   created_at: new Date().toISOString(), // Set current timestamp
          teacher_id:teacherId,
          category_id:extractedData.category_id
        }
      ])
      .select();
      return {data,error}
}




export { getAllCourses, getFilteredCourses, getCategories, getCoursesLimit, getStudentCourses, getTeacherCourses, getCourseById, enrollCourse, unenrollCourse, updateCourseEnrollmentProgress };



