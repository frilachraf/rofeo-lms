import { useEffect, useState } from "react"
import { getAllCourses, deleteCourse } from "../services/adminServices"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit2, Eye, Plus, Clock } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Loading } from "@/components/ui/loading"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import CourseAddForm from "../components/forms/CourseAddForm"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const fetchCourses = async () => {
        try {
            const { data, error } = await getAllCourses()
            if (error) throw error
            setCourses(data)
        } catch (error) {
            console.error("Erreur lors de la récupération des cours :", error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (courseId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce cours ?")) {
            try {
                const { error } = await deleteCourse(courseId)
                if (error) throw error
                fetchCourses() // Refresh the list
            } catch (error) {
                console.error("Erreur lors de la suppression du cours :", error)
            }
        }
    }

    useEffect(() => {
        fetchCourses()
    }, [])

    if (loading) return <Loading />

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6 p-6 md:p-8"
        >
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Gestion des Cours</h2>
                    <p className="text-sm text-muted-foreground mt-1">Gérer tous les cours de la plateforme</p>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {/* <Button className="shadow-sm hover:shadow-md transition-all duration-200">
                                <Plus className="h-4 w-4 mr-2" />
                                Ajouter un Nouveau Cours
                            </Button> */}
                        </motion.div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Ajouter un Nouveau Cours</DialogTitle>
                            <DialogDescription>
                                Remplissez les détails pour créer un nouveau cours.
                            </DialogDescription>
                        </DialogHeader>
                        <CourseAddForm 
                            onSuccess={() => {
                                setOpen(false)
                                fetchCourses()
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-lg border shadow-sm"
            >
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="font-semibold">Cours</TableHead>
                            <TableHead className="font-semibold">Enseignant</TableHead>
                            <TableHead className="font-semibold">Statut</TableHead>
                            <TableHead className="font-semibold">Inscriptions</TableHead>
                            <TableHead className="font-semibold">Durée</TableHead>
                            <TableHead className="text-center font-semibold">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {courses.map((course, index) => (
                            <motion.tr
                                key={course.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 * index }}
                                className="hover:bg-muted/50 transition-colors"
                            >
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-medium line-clamp-1">{course.title}</span>
                                      
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={course.teacher?.avatar} />
                                            <AvatarFallback className="bg-primary/10">
                                                {course.teacher?.full_name?.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{course.teacher?.full_name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge 
                                        variant="secondary"
                                        className={course.public ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-500"}
                                    >
                                        {course.public ? "Public" : "Brouillon"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="bg-primary/10">
                                        {course.enrollments?.length || 0} étudiants
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                        <Clock className="h-3 w-3" />
                                        <span>{course.duration} min</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="flex justify-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => navigate(`/admin/courses/${course.id}`)}
                                            className="hover:bg-primary/10"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => navigate(`/admin/courses/edit/${course.id}`)}
                                            className="hover:bg-primary/10"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(course.id)}
                                            className="hover:bg-destructive/10 hover:text-destructive"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </motion.tr>
                        ))}
                    </TableBody>
                </Table>
            </motion.div>
        </motion.div>
    )
} 