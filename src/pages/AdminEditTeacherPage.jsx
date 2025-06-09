import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getTeacher, updateTeacher } from "../services/adminServices"
import TeacherForm from "../components/forms/TeacherForm"
import { Loading } from "@/components/ui/loading"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

export default function AdminEditTeacherPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [teacher, setTeacher] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const { data, error } = await getTeacher(id)
                if (error) throw error
                setTeacher(data)
            } catch (error) {
                console.error("Erreur lors de la récupération de l'enseignant :", error)
            } finally {
                setLoading(false)
            }
        }

        fetchTeacher()
    }, [id])

    const handleUpdate = async (updatedTeacher) => {
        try {
            const { error } = await updateTeacher(id, updatedTeacher)
            if (error) throw error
            navigate("/admin/teachers")
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'enseignant :", error)
        }
    }

    if (loading) return <Loading />
    if (!teacher) return <div>Enseignant introuvable</div>

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
                    onClick={() => navigate("/admin/teachers")}
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="text-2xl font-bold">Modifier l'Enseignant</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Modifier les détails de l'enseignant "{teacher.full_name}"
                    </p>
                </div>
            </div>

            <div className="max-w-2xl">
                <TeacherForm teacher={teacher} mode="edit" onSuccess={handleUpdate} />
            </div>
        </motion.div>
    )
} 