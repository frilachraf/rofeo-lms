import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table'
import { EyeSlash, Spinner } from '@phosphor-icons/react'
import { BadgeCheckIcon } from 'lucide-react'
import moment from 'moment/moment'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getTeacherCoursesCount, getTeacherEnrollmentsCount, getTeacherStudentsLast } from '../services/teacherService'
import { Link } from "react-router-dom"
import { Button } from '@/components/ui/button'

export function TeacherOverviewPage() {
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [coursesCount, setCoursesCount] = useState()
    const [enrollmentsCount, setEnrollmentsCount] = useState()

  const { user } = useAuth()
  const fetchCounts = async ()=>{
    try {
      setIsLoading(true)
      // TODO: Implement API call to fetch counts
      const { count: enrollmentsCount, error: enrollmentsError } = await getTeacherEnrollmentsCount(user.id)
      const { count: coursesCount, error: coursesError } = await getTeacherCoursesCount(user.id)
      setEnrollmentsCount(enrollmentsCount)
      setCoursesCount(coursesCount)
      console.log(enrollmentsCount, coursesCount)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  
  }
  const fetchStudents = async () => {
    try {
      setIsLoading(true)
      // TODO: Implement API call to fetch students
      const { data, error } = await getTeacherStudentsLast(user.id)
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
    fetchCounts()
  }, [user?.id])
  return (
    <div className="">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Bienvenue </h1>
        <p className="text-gray-500">En tant qu'enseignant, accédez à votre tableau de bord. Vous pouvez gérer vos cours et suivre vos inscriptions.</p>
        <Button onClick={fetchCounts}>Recharger</Button>
      </div>
      <div
        className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Mes cours</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {isLoading ? 
              <Spinner size={30} className="animate-spin"/> : coursesCount}
            </CardTitle>
            <CardAction>
              {/* <Badge variant="outline"  className='text-green-700'>
              <IconTrendingUp />
              +12.5%
            </Badge> */}
            </CardAction>
          </CardHeader>

        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Inscriptions</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              { isLoading ? 
              <Spinner size={30} className="animate-spin"/> :
              enrollmentsCount 
              }
            </CardTitle>
            <CardAction>
              {/* <Badge variant="outline">
              <IconTrendingDown />
              -20%
            </Badge> */}
            </CardAction>
          </CardHeader>

        </Card>


      </div>
      <div className="">
        <div className="flex items-center justify-between my-5">
          <h2 className="text-2xl font-semibold">Dernières inscriptions</h2>
          <div>
            <Link to={'/teacher/students'} className="">
            Voir tout 
            </Link>
          </div>
        </div>
        <div className="relative flex flex-col gap-4 overflow-auto h-full">
          <div className="overflow-hidden rounded-lg border h-full">
            <Table variant='border' className=''>
              <TableHeader className='bg-muted'>
                <TableRow>
                  <TableHead>Étudiant</TableHead>
                  <TableHead>inscrit à</TableHead>
                  <TableHead>Titre du cours</TableHead>
                  <TableHead>Statut du cours</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students && students.map((item, i) => (
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
    </div>
  );
}
