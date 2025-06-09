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
    const [students, setStudents] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    
    const {user} = useAuth()

    const fetchStudents = async () => {
        try {
            setIsLoading(true)
            // TODO: Implement API call to fetch students
            const {data,error} = await getTeacherStudents(user.id)
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
    }, [user?.id])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="container py-8 px-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Students</h1>
                <Button variant="outline" onClick={() => fetchStudents()}>
                    <ArrowCounterClockwise size={20} />
                </Button>
            </div>

            <div className="relative flex flex-col gap-4 overflow-auto h-full">
                <div className="overflow-hidden rounded-lg border">
                    <Table variant='border' className=''>
                        <TableHeader className='bg-muted'>
                            <TableRow>
                                <TableHead>Student</TableHead>
                                <TableHead>enrolled at</TableHead>
                                <TableHead>Course title</TableHead>
                                <TableHead>Course Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students && students.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="flex gap-1 items-center">
                                            <Avatar>
                                                <AvatarImage src={item.student.avatar} />
                                                <AvatarFallback>{item.student?.full_name?.slice(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            {item.student.full_name}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-gray-500">{moment(item.created_at).startOf('hour').fromNow()}</TableCell>
                                    <TableCell>{item.course.title}</TableCell>
                                    <TableCell className="text-center">
                                        {item.course.public
                                            ?
                                            <Badge
                                                variant="secondary"
                                                className="bg-green-500/10 text-green-500"
                                            >
                                                <BadgeCheckIcon />
                                                public
                                            </Badge>
                                            :
                                            <Badge
                                                variant="secondary"
                                                className="bg-gray-500/10 text-gray-500"
                                            >
                                                <EyeSlash />
                                                archived
                                            </Badge>
                                        }
                                    </TableCell>
                                    {/* <TableCell>{JSON.stringify(item.student)}</TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
