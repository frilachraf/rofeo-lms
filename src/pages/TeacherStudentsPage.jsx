import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowCounterClockwise } from '@phosphor-icons/react'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { getTeacherStudents } from '../services/teacherService'
export default function TeacherStudentsPage() {
    const [students, setStudents] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const teacherId = '46c8f855-1dc4-4795-a3fa-e13fc4633fa6'

    const fetchStudents = async () => {
        try {
            setIsLoading(true)
            // TODO: Implement API call to fetch students
            const {data,error} = await getTeacherStudents(teacherId)
            setStudents(data)
            console.log(data)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchStudents()
    }, [teacherId])

    if (isLoading) {
        return <div>Chargement...</div>
    }

    return (
        <div className="container py-8 px-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Etudiants</h1>
                <Button variant="outline" onClick={() => fetchStudents()}>
                    <ArrowCounterClockwise size={20}/>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Cours</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {students && students.map((student) => (
                        <TableRow key={student.id}>
                            <TableCell>{student.course.title}</TableCell>
                            <TableCell>{student.content}</TableCell>
                            <TableCell>{student.course.name}</TableCell>
                            {/* <TableCell>{JSON.stringify(student)}</TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
