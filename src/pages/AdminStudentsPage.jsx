import { useEffect, useState } from "react"
import { getStudents, deleteStudent } from "../services/adminServices"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trash2, Edit2, Plus, BookOpen, Mail } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Loading } from "@/components/ui/loading"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import StudentForm from "../components/forms/StudentForm"
import { motion } from "framer-motion"

export default function AdminStudentsPage() {
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const fetchStudents = async () => {
        try {
            const { data, error } = await getStudents()
            if (error) throw error
            setStudents(data)
        } catch (error) {
            console.error("Erreur lors de la récupération des étudiants :", error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (studentId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet étudiant ?")) {
            try {
                const { error } = await deleteStudent(studentId)
                if (error) throw error
                fetchStudents() // Refresh the list
            } catch (error) {
                console.error("Erreur lors de la suppression de l'étudiant :", error)
            }
        }
    }

    useEffect(() => {
        fetchStudents()
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
                    <h2 className="text-2xl font-bold">Gestion des Étudiants</h2>
                    <p className="text-sm text-muted-foreground mt-1">Gérer tous les étudiants de la plateforme</p>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Button className="shadow-sm hover:shadow-md transition-all duration-200">
                                <Plus className="h-4 w-4 mr-2" />
                                Ajouter un Nouvel Étudiant
                            </Button>
                        </motion.div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Ajouter un Nouvel Étudiant</DialogTitle>
                            <DialogDescription>
                                Remplissez les détails pour créer un nouveau compte étudiant.
                            </DialogDescription>
                        </DialogHeader>
                        <StudentForm 
                            mode="add" 
                            onSuccess={() => {
                                setOpen(false)
                                fetchStudents()
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
                            <TableHead className="font-semibold">Étudiant</TableHead>
                            <TableHead className="font-semibold">Email</TableHead>
                            <TableHead className="font-semibold">Inscriptions</TableHead>
                            <TableHead className="text-right font-semibold">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student.id} className="hover:bg-muted/50 transition-colors">
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={student.avatar} />
                                            <AvatarFallback className="bg-primary/10">
                                                {student.full_name?.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{student.full_name}</span>
                                            <span className="text-xs text-muted-foreground line-clamp-1">
                                                {student.bio || "Pas de biographie disponible"}
                                            </span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Mail className="h-3 w-3" />
                                        <span>{student.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary" className="bg-primary/10">
                                            <BookOpen className="h-3 w-3 mr-1" />
                                            {student.enrollments?.length || 0} inscriptions
                                        </Badge>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => navigate(`/admin/students/edit/${student.id}`)}
                                            className="hover:bg-primary/10"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(student.id)}
                                            className="hover:bg-destructive/10 hover:text-destructive"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </motion.div>
        </motion.div>
    )
} 