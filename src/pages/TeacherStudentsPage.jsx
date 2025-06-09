import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ArrowCounterClockwise, EyeSlash } from '@phosphor-icons/react'
import { BadgeCheckIcon } from 'lucide-react'
import moment from 'moment/moment'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getTeacherStudents } from '../services/teacherService'

export default function TeacherStudentsPage() {
    const { user } = useAuth()
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const { data, error } = await getTeacherStudents(user.id)
                if (error) throw error
                setStudents(data)
            } catch (error) {
                console.error("Erreur lors de la récupération des étudiants :", error)
            } finally {
                setLoading(false)
            }
        }

        fetchStudents()
    }, [user.id])

    if (loading) return <div>Chargement...</div>

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Mes Étudiants</h1>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Étudiants</TableHead>
                            <TableHead>Date d'inscription</TableHead>
                            <TableHead>Titre du cours</TableHead>
                            <TableHead>Statut du cours</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={item.student?.avatar} />
                                            <AvatarFallback>
                                                {item.student?.full_name?.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{item.student?.full_name}</p>
                                            <p className="text-sm text-gray-500">{item.student?.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-gray-500">
                                    {moment(item.created_at).startOf('hour').fromNow()}
                                </TableCell>
                                <TableCell>{item.course?.title}</TableCell>
                                <TableCell>
                                    {item.course?.public ? (
                                        <Badge variant="success">Public</Badge>
                                    ) : (
                                        <Badge variant="secondary">Archivé</Badge>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
