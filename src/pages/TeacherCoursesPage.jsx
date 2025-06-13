import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import CourseCard from "@/components/theme/CourseCard"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { getTeacherAccountById } from "../services/teacherService"
import { getTeacherCourses } from "../services/coursesService"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import CourseAddForm from "../components/forms/CourseAddForm"
import { TeacherCourseCard } from "../components/theme/CourseCard"

export default function TeacherCoursesPage() {
    const { user } = useAuth()
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data, error } = await getTeacherCourses(user.id)
                if (error) throw error
                setCourses(data)
                console.log("Fetched courses data:", data)
            } catch (error) {
                console.error("Erreur lors de la récupération des cours :", error)
            } finally {
                setLoading(false)
            }
        }

        fetchCourses()
    }, [user.id])

    if (loading) return <div>Chargement...</div>

    return (
        <div className="">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Mes Cours</h1>
                <Button onClick={() => setOpen(true)}>
                    Ajouter un cours
                </Button>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ajouter un cours</DialogTitle>
                        <DialogDescription>
                            {/* description */}
                        </DialogDescription>
                    </DialogHeader>
                    <CourseAddForm setOpen={setOpen} />
                </DialogContent>
            </Dialog>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <TeacherCourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    )
}
