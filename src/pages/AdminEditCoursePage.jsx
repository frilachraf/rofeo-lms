import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getCourse, updateCourse } from "../services/adminServices"
import CourseAddForm from "../components/forms/CourseAddForm"
import { Loading } from "@/components/ui/loading"

export default function AdminEditCoursePage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [course, setCourse] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const { data, error } = await getCourse(id)
                if (error) throw error
                if (!data) {
                    navigate('/admin/courses')
                    return
                }
                setCourse(data)
            } catch (error) {
                console.error("Erreur lors de la récupération des cours :", error)
                navigate('/admin/courses')
            } finally {
                setLoading(false)
            }
        }

        fetchCourse()
    }, [id, navigate])

    if (loading) return <Loading />
    if (!course) return null

    return (
        <div className="flex flex-col gap-6 p-6 md:p-8">
            <h2 className="text-2xl font-bold">Modifier le Cours</h2>
            <p className="text-sm text-muted-foreground mt-1">Modifier les détails du cours.</p>
            <CourseAddForm course={course} mode="edit" onSuccess={() => navigate('/admin/courses')} />
        </div>
    )
} 