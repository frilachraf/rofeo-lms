import { useEffect, useState } from "react";
import { getTeachers } from "../services/adminServices";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import TeacherAddForm from "../components/forms/TeacherAddForm";
const TeachersPage = () => {
    const [teachers, setTeachers] = useState([]);
    const [open, setOpen] = useState(false);
    const fetchData = async () => {
        try {
            const { data, error } = await getTeachers();
            setTeachers(data)
        } catch (err) {
            console.log(err)
        }

    }
    useEffect(() => {
        console.log('teachers page')
        fetchData()
    }, [])
    return (
        <>
            <div className="p-8">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-sembiold ">Teachers</h1>
                    <Button onClick={() => setOpen(true)}>Add teacher</Button>
                </div>
                <div className="grid sm:grid-cols-12 gap-4 my-10">
                    {teachers.map((teacher) => (
                        <Card key={teacher.id} className="col-span-6 ">
                            <div className="flex px-4">
                                <Avatar className="w-18 h-18">
                                    <AvatarImage src={teacher.avatar} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <CardHeader>
                                    <CardTitle>{teacher?.full_name}</CardTitle>
                                    <CardDescription>{teacher?.expertise}</CardDescription>
                                    <CardDescription>example@gmail.com
                                    </CardDescription>
                                    <CardDescription className="flex line-climp-1">{teacher?.courses?.length} courses</CardDescription>


                                </CardHeader>
                            </div>
                            {/* <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                        <CardAction>Card Action</CardAction>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter> */}
                        </Card>
                    ))}
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add new teacher</DialogTitle>
                            <DialogDescription>
                                After creating teacher account we'll send to the email you entered the verifcation link
                            </DialogDescription>
                        </DialogHeader>
{/* Suggested code may be subject to a license. Learn more: ~LicenseLog:22903627. */}
                        <TeacherAddForm setOpen={(e)=> {setOpen(e); fetchData()} } />
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
};

export default TeachersPage;