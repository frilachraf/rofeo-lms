import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getCourse, updateCourse } from "../services/adminServices"
import CourseEditForm from "../components/forms/CourseEditForm"
import { Loading } from "@/components/ui/loading"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

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
                setCourse(data)
            } catch (error) {
                console.error("Erreur lors de la récupération du cours :", error)
            } finally {
                setLoading(false)
            }
        }

        fetchCourse()
    }, [id])

    const handleUpdate = async (updatedCourse) => {
        try {
            const { error } = await updateCourse(id, updatedCourse)
            if (error) throw error
            navigate("/admin/courses")
        } catch (error) {
            console.error("Erreur lors de la mise à jour du cours :", error)
        }
    }

    if (loading) return <Loading />
    if (!course) return <div>Cours introuvable</div>

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
                    onClick={() => navigate("/admin/courses")}
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="text-2xl font-bold">Modifier le Cours</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Modifier les détails du cours "{course.title}"
                    </p>
                </div>
            </div>

            <div className="max-w-2xl">
                <CourseEditForm course={course} onUpdate={handleUpdate} />
            </div>
        </motion.div>
    )
} 