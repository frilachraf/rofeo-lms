// analytics
import { supabase } from "../supabaseClient";
import { toast } from "sonner"

// Helper function for error handling
const handleError = (error, messageKey) => {
    const translatedMessage = messageKey; // Fallback to key if t is not provided
    console.error(translatedMessage, error)
    toast.error(translatedMessage)
    throw error
}

export const getTeachersCount = async () => {
    try {
        const { count, error } = await supabase.from('teachers_accounts')
            .select("*", { count: 'exact' })
        if (error) throw error
        return { count, error: null }
    } catch (error) {
        return handleError(error, 'Erreur lors de la récupération du nombre d\'enseignants')
    }
}

// teacher
export const createTeacher = async (extractedData) => {
    try {
        console.log(extractedData)
        // create teacher auth 
        const {data: userAuth, error: userAuthError } = await supabase.auth.signUp({ 
            email: extractedData.email, 
            password: extractedData.password 
        })
        if (userAuthError) throw userAuthError

        // create teacher account
        const {data: teacherAccount, error: teacherAccountError } = await supabase
            .from('teachers_accounts')
            .insert({
                full_name: extractedData.full_name,
                bio: extractedData.bio,
                avatar: `https://avatar.iran.liara.run/public/boy?username=${extractedData.full_name}`,
                id: userAuth.user.id,
            })
            .select('*')
        if (teacherAccountError) throw teacherAccountError

        // create role
        const { error: roleError } = await supabase
            .from('users_roles')
            .insert({
                user_id: userAuth.user.id,
                name: 'teacher',
            })
        if (roleError) throw roleError

        toast.success('Enseignant créé avec succès')
        return { userAuth }
    } catch (error) {
        return handleError(error, 'Erreur lors de la création de l\'enseignant')
    }
}

export const getTeachers = async () => {
    const {data, error} = await supabase
        .from('teachers_accounts')
        .select('*, courses(id)')
    if(error){
        return handleError(error, 'Erreur lors de la récupération des enseignants')
    }
    return {data, error}
}

export const getTeacher = async (teacherId) => {
    const {data, error} = await supabase
        .from('teachers_accounts')
        .select('*, courses(*)')
        .eq('id', teacherId)
        .single()
    if(error){
        return handleError(error, 'Erreur lors de la récupération de l\'enseignant')
    }
    return {data, error}
}

export const updateTeacher = async (teacherId, updateData) => {
    const {data, error} = await supabase
        .from('teachers_accounts')
        .update(updateData)
        .eq('id', teacherId)
        .select()
    if(error){ return handleError(error, 'Erreur lors de la mise à jour de l\'enseignant') }
    toast.success('Enseignant mis à jour avec succès')
    return {data, error}
}

export const deleteTeacher = async (teacherId) => {
    const {error} = await supabase
        .from('teachers_accounts')
        .delete()
        .eq('id', teacherId)
    if(error){ return handleError(error, 'Erreur lors de la suppression de l\'enseignant') }
    toast.success('Enseignant supprimé avec succès')
    return {error}
}

// students
export const getStudents = async () => {
    const {data, error} = await supabase
        .from('students_accounts')
        .select('*, enrollments(id)')
    if(error){
        return handleError(error, 'Erreur lors de la récupération des étudiants')
    }
    return {data, error}
}

export const getStudent = async (studentId) => {
    const {data, error} = await supabase
        .from('students_accounts')
        .select('*, enrollments(*)')
        .eq('id', studentId)
        .single()
    if(error){
        return handleError(error, 'Erreur lors de la récupération de l\'étudiant')
    }
    return {data, error}
}

export const updateStudent = async (studentId, updateData) => {
    const {data, error} = await supabase
        .from('students_accounts')
        .update(updateData)
        .eq('id', studentId)
        .select()
    if(error){ return handleError(error, 'Erreur lors de la mise à jour de l\'étudiant') }
    toast.success('Étudiant mis à jour avec succès')
    return {data, error}
}

export const deleteStudent = async (studentId) => {
    const {error} = await supabase
        .from('students_accounts')
        .delete()
        .eq('id', studentId)
    if(error){ return handleError(error, 'Erreur lors de la suppression de l\'étudiant') }
    toast.success('Étudiant supprimé avec succès')
    return {error}
}

// courses
export const getCourses = async () => {
    const {data, error} = await supabase
        .from('courses')
        .select('*, teacher:teachers_accounts(full_name,avatar), enrollments(id)')
    if(error){
        return handleError(error, 'Erreur lors de la récupération des cours')
    }
    return {data, error}
}

export const getAllCourses = async () => {
    const {data, error} = await supabase
        .from('courses')
        .select('*, teacher:teachers_accounts(full_name,avatar), enrollments(id)')
    if(error){
        return handleError(error, 'Erreur lors de la récupération de tous les cours')
    }
    return {data, error}
}

export const getCourse = async (courseId) => {
    const {data, error} = await supabase
        .from('courses')
        .select('*, teacher:teachers_accounts(*), enrollments(*)')
        .eq('id', courseId)
        .single()
    if(error){
        return handleError(error, 'Erreur lors de la récupération du cours')
    }
    return {data, error}
}

export const updateCourse = async (courseId, updateData) => {
    const {data, error} = await supabase
        .from('courses')
        .update(updateData)
        .eq('id', courseId)
        .select()
    if(error){ return handleError(error, 'Erreur lors de la mise à jour du cours') }
    toast.success('Cours mis à jour avec succès')
    return {data, error}
}

export const deleteCourse = async (courseId) => {
    const {error} = await supabase
        .from('courses')
        .delete()
        .eq('id', courseId)
    if(error){ return handleError(error, 'Erreur lors de la suppression du cours') }
    toast.success('Cours supprimé avec succès')
    return {error}
}

export const getCoursesCount = async () => {
    const { count, error } = await supabase.from('courses')
        .select("*", { count: 'exact' })
    if(error){
        return handleError(error, 'Erreur lors de la récupération du nombre de cours')
    }
    return { count, error }
}

export const getStudentsCount = async () => {
    const { count, error } = await supabase.from('students_accounts')
        .select("*", { count: 'exact' })
    if(error){
        return handleError(error, 'Erreur lors de la récupération du nombre d\'étudiants')
    }
    return { count, error }
}

export const getTodayEnrollmentsCount = async () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Set time to 00:00:00

    const { count, error } = await supabase
        .from('enrollments')
        .select('*', { count: 'exact' })
        .gte('created_at', today.toISOString())
    if(error){
        return handleError(error, 'Erreur lors de la récupération du nombre d\'inscriptions aujourd\'hui')
    }
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
        return handleError(error, 'Erreur lors de la récupération des inscriptions')
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
    return { data: result }
}

export const createStudent = async (extractedData) => {
    // create student auth 
    const {data: userAuth, error: userAuthError } = await supabase.auth.signUp({ 
        email: extractedData.email, 
        password: extractedData.password 
    });

    if (userAuthError) throw userAuthError;

    // create student account
    const {data: studentAccount, error: studentAccountError } = await supabase
        .from('students_accounts')
        .insert({
            full_name: extractedData.full_name,
            bio: extractedData.bio,
            avatar: `https://avatar.iran.liara.run/public/boy?username=${extractedData.full_name}`,
            id: userAuth.user.id,
        })
        .select('*')

    if (studentAccountError) throw studentAccountError;

    // create role
    const { error: roleError } = await supabase
        .from('users_roles')
        .insert({
            user_id: userAuth.user.id,
            name: 'student',
        })

    if (roleError) throw roleError;
    toast.success('Étudiant créé avec succès');
    return { userAuth }
}

export const getPopularCourses = async () => {
    const { data, error } = await supabase
        .from('courses')
        .select('*, teacher:teachers_accounts(full_name,avatar), enrollments(count)')
        .order('enrollments.count', { ascending: false })
        .limit(5)
    if(error){ return handleError(error, 'Erreur lors de la récupération des cours populaires') }
    return { data, error }
}

export const getRecentStudentActivities = async () => {
    const { data, error } = await supabase
        .from('enrollments')
        .select(`
            *,
            student:students_accounts(full_name, avatar),
            course:courses(title)
        `)
        .order('created_at', { ascending: false })
        .limit(5)
    if(error){ return handleError(error, 'Erreur lors de la récupération des activités récentes') }
    return { data, error }
}

