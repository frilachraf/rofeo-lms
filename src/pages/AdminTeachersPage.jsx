import { useEffect, useState } from "react"
import { getTeachers, deleteTeacher } from "../services/adminServices"
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
import TeacherForm from "../components/forms/TeacherForm"

export default function AdminTeachersPage() {
    const [teachers, setTeachers] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const fetchTeachers = async () => {
        try {
            const { data, error } = await getTeachers()
            if (error) throw error
            setTeachers(data)
        } catch (error) {
            console.error("Erreur lors de la récupération des enseignants :", error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (teacherId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet enseignant ?")) {
            try {
                const { error } = await deleteTeacher(teacherId)
                if (error) throw error
                fetchTeachers() // Refresh the list
            } catch (error) {
                console.error("Erreur lors de la suppression de l'enseignant :", error)
            }
        }
    }

    useEffect(() => {
        fetchTeachers()
    }, [])

    if (loading) return <Loading />

    return (
        <div className="flex flex-col gap-6 p-6 md:p-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Gestion des Enseignants</h2>
                    <p className="text-sm text-muted-foreground mt-1">Gérer tous les enseignants de la plateforme</p>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="shadow-sm hover:shadow-md transition-all duration-200">
                            <Plus className="h-4 w-4 mr-2" />
                            Ajouter un Nouvel Enseignant
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Ajouter un Nouvel Enseignant</DialogTitle>
                            <DialogDescription>
                                Remplissez les détails pour créer un nouveau compte enseignant.
                            </DialogDescription>
                        </DialogHeader>
                        <TeacherForm 
                            mode="add" 
                            onSuccess={() => {
                                setOpen(false)
                                fetchTeachers()
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-lg border shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="font-semibold">Enseignant</TableHead>
                            <TableHead className="font-semibold">Email</TableHead>
                            <TableHead className="font-semibold">Cours</TableHead>
                            <TableHead className="text-right font-semibold">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {teachers.map((teacher) => (
                            <TableRow key={teacher.id} className="hover:bg-muted/50 transition-colors">
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={teacher.avatar} />
                                            <AvatarFallback className="bg-primary/10">
                                                {teacher.full_name?.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{teacher.full_name}</span>
                                            <span className="text-xs text-muted-foreground line-clamp-1">
                                                {teacher.bio || "Pas de biographie disponible"}
                                            </span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Mail className="h-3 w-3" />
                                        <span>{teacher.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary" className="bg-primary/10">
                                            <BookOpen className="h-3 w-3 mr-1" />
                                            {teacher.courses?.length || 0} cours
                                        </Badge>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => navigate(`/admin/teachers/edit/${teacher.id}`)}
                                            className="hover:bg-primary/10"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(teacher.id)}
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
            </div>
        </div>
    )
} 