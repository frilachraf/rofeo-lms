import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getTeachers } from "../services/adminServices"
import TeacherForm from "../components/forms/TeacherForm"
import { Loading } from "@/components/ui/loading"

export default function AdminEditTeacherPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [teacher, setTeacher] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const { data, error } = await getTeachers()
                if (error) throw error
                const teacherData = data.find(t => t.id === id)
                if (!teacherData) {
                    navigate('/admin/teachers')
                    return
                }
                setTeacher(teacherData)
            } catch (error) {
                console.error("Erreur lors de la récupération des enseignants :", error)
                navigate('/admin/teachers')
            } finally {
                setLoading(false)
            }
        }

        fetchTeacher()
    }, [id, navigate])

    if (loading) return <Loading />
    if (!teacher) return null

    return (
        <div className="flex flex-col gap-6 p-6 md:p-8">
            <h2 className="text-2xl font-bold">Modifier l'Enseignant</h2>
            <p className="text-sm text-muted-foreground mt-1">Modifier les détails de l'enseignant.</p>
            <TeacherForm teacher={teacher} mode="edit" onSuccess={() => navigate('/admin/teachers')} />
        </div>
    )
} 