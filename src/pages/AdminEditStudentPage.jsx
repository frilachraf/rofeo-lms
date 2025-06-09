import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getStudent, updateStudent } from "../services/adminServices"
import StudentForm from "../components/forms/StudentForm"
import { Loading } from "@/components/ui/loading"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

export default function AdminEditStudentPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [student, setStudent] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const { data, error } = await getStudent(id)
                if (error) throw error
                setStudent(data)
            } catch (error) {
                console.error("Erreur lors de la récupération de l'étudiant :", error)
            } finally {
                setLoading(false)
            }
        }

        fetchStudent()
    }, [id])

    const handleUpdate = async (updatedStudent) => {
        try {
            const { error } = await updateStudent(id, updatedStudent)
            if (error) throw error
            navigate("/admin/students")
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'étudiant :", error)
        }
    }

    if (loading) return <Loading />
    if (!student) return <div>Étudiant introuvable</div>

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6 p-6 md:p-8"
        >
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate("/admin/students")}
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="text-2xl font-bold">Modifier l'Étudiant</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Modifier les détails de l'étudiant "{student.full_name}"
                    </p>
                </div>
            </div>

            <div className="max-w-2xl">
                <StudentForm student={student} mode="edit" onSuccess={handleUpdate} />
            </div>
        </motion.div>
    )
} 