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
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const { user } = useAuth()
    const navigate = useNavigate()
    const fetchTeacherCourses = async () => {
        try{
            setLoading(true)
            const { data: courses, error: coursesError } = await getTeacherCourses(user.id)
            if (coursesError) {
                throw coursesError
            }
            console.log(courses)
            setCourses(courses)

        }
        catch (error) {

        }
        finally{
            setLoading(false)
        }
        // get teacher courses
    }
    useEffect(() => {
        
        fetchTeacherCourses()
    }, [user])

    return (
        <div className="">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">My Courses</h1>
                <Button onClick={() => setOpen(true)}>
                    Add New Course
                </Button>
            </div>

        
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                    <TeacherCourseCard key={course.id} course={course} />
                ))}
            </div>
           
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Create Course</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                    </DialogHeader>
                    <CourseAddForm setOpen={(e) => {setOpen(e); fetchTeacherCourses()}} teacherId={user?.id}/>
                </DialogContent>
                </Dialog>

        </div>
    )
}
