import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getStudents } from "../services/adminServices"
import StudentForm from "../components/forms/StudentForm"
import { Loading } from "@/components/ui/loading"

export default function AdminEditStudentPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [student, setStudent] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const { data, error } = await getStudents()
                if (error) throw error
                const studentData = data.find(s => s.id === id)
                if (!studentData) {
                    navigate('/admin/students')
                    return
                }
                setStudent(studentData)
            } catch (error) {
                console.error("Erreur lors de la récupération des étudiants :", error)
                navigate('/admin/students')
            } finally {
                setLoading(false)
            }
        }

        fetchStudent()
    }, [id, navigate])

    if (loading) return <Loading />
    if (!student) return null

    return (
        <div className="flex flex-col gap-6 p-6 md:p-8">
            <h2 className="text-2xl font-bold">Modifier l'Étudiant</h2>
            <p className="text-sm text-muted-foreground mt-1">Modifier les détails de l'étudiant.</p>
            <StudentForm student={student} mode="edit" onSuccess={() => navigate('/admin/students')} />
        </div>
    )
} 