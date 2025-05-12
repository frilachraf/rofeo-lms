import { useEffect } from "react"
import { listFiles } from "../services/storage"

export default function TeacherFilesPages (){
    
    const fetchFiles = async ()=>{
        const files = await listFiles('')
        console.log(files)
    }
    
    useEffect(()=>{
        fetchFiles()
    })
    return (<>
    
    </>)
}