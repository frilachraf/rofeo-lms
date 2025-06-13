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
        .select('*,teacher:teacher_id(*)')
        

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
        .select(`
            *,
            teacher:teacher_id(full_name, avatar),
            enrollments:enrollments(count)
        `)
        .order('enrollments.count', { ascending: false })
        .limit(limit)
    return { data, error }
}

// approved by me
const getStudentCourses = async (userId) => {
    const { data, error } = await supabase
        .from('enrollments')
        .select('*, details:courses(*,lessons(*),level:level_id(*)),teacher:teachers_accounts(*),enrollment_progress(*)')
        .eq('student_account_id', userId)
    return { data, error }
}

// approved by me
const getTeacherCourses = async (userId) => {
    const { data, error } = await supabase
        .from('courses')
        .select('*, level:level_id(*)')
        .eq('teacher_id', userId)
    return { data, error }
}

// approved by me
const getCourseById = async (courseId) => {
    const { data, error } = await supabase.from('courses')
        .select('*, level:level_id(*), teacher:teacher_id(*),lessons(*)')
        .eq('id', courseId).single()
    return { data, error }
}

// approved by me
const enrollCourse = async (userId, courseId,teacherId) => {
    const { data, error } = await supabase.from('enrollments')
        .insert({ student_account_id: userId, course_id: courseId,teacher_account_id:teacherId})
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
          title:extractedData.title,
          description:extractedData.description,
        //   total_enrollments: total_enrollments || 0, // Default to 0 if not provided
        //   status: status || 'draft', // Default to 'draft' if not provided
          duration:extractedData.duration,
          thumbnail:extractedData.thumbnail,
        //   created_at: new Date().toISOString(), // Set current timestamp
          teacher_id:teacherId,
          level_id:extractedData.level_id
        }
      ])
      .select();
      return {data,error}
}


export const getLevels = async () => {
    const { data, error } = await supabase.from('levels')
    .select('*')
    return { data, error }
}


export const createLesson = async (lessonData) => {
    const { data, error } = await supabase
        .from('lessons')
        .insert({
            title:lessonData.title,
            content:lessonData.content,
            video_url:lessonData.video,
            file_url:lessonData.pdf,
            course_id:lessonData.course_id
        })
        .select('*')
    return { data, error }
}   

export const deleteLesson = async (lessonId) => {
    const { data, error } = await supabase
        .from('lessons')
        .delete()
        .eq('id', lessonId).select()
    return { data, error }
}

export const updateCourse = async (courseId, extractedData) => {
    const { data, error } = await supabase
        .from('courses')
        .update({
            title: extractedData.title,
            description: extractedData.description,
            duration: extractedData.duration,
            thumbnail: extractedData.thumbnail,
            level_id: extractedData.level_id
        })
        .eq('id', courseId)
        .select();
    return { data, error }
}

export const addEnrollmentProgress = async (enrollmentId, lessonId) => {
    // First check if record already exists
    const { data: existingData } = await supabase
        .from('enrollment_progress')
        .select('*')
        .eq('enrollment_id', enrollmentId)
        .eq('lesson_id', lessonId)
        .single();

    if (existingData) {
        return { data: existingData, error: null };
    }

    // If record does not exist, insert a new one
    const { data, error } = await supabase
        .from('enrollment_progress')
        .insert({
            enrollment_id: enrollmentId,
            lesson_id: lessonId
        })
        .select('*')
        .single();

    return { data, error };
}

export { getAllCourses, getFilteredCourses, getCategories, getCoursesLimit, getStudentCourses, getTeacherCourses, getCourseById, enrollCourse, unenrollCourse, updateCourseEnrollmentProgress };



