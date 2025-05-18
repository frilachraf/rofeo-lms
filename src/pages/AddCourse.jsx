import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/dropzone'
import { useSupabaseUpload } from '@/hooks/use-supabase-upload'
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { data } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'react-toastify'
import { getFile, uploadFile } from '../services/storageService'
import TextEditor from '../components/theme/TextEditor'


  import {
    DndContext, 
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
  } from '@dnd-kit/core';
  import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
  } from '@dnd-kit/sortable';
  
  import {SortableItem} from '../components/theme/Draggable';
import { createCourse } from '../services/coursesService'
import { LessonForm } from '../components/forms/LessonAddForm'


  const newCourse = {
    title: 'Introduction to React',
    description: 'Learn React fundamentals',
    duration: 30, // in minutes
    image_url: 'https://example.com/react-course.jpg',
    category_id: 3
  };
const AddCoursePage = () => {
  const [file, setFile] = useState(null);
  const [pdf,setPdf]=useState(null)
  // const props = useSupabaseUpload({
  //   bucketName: 'rofeo-storage',
  //   path: 'test',
  //   allowedMimeTypes: ['image/*'],
  //   maxFiles: 2,
  //   maxFileSize: 1000 * 1000 * 10, // 10MB,
  // })
  // console.log(props.files)
  const handleCourseCreateSubmit = async ()=>{
    const {data, error}= await createCourse("f273ab93-73f9-4c9a-8f2e-447e5da67b5f",newCourse)
  }
  const handleCreateLesson = async (e)=>{
    e.preventDefault()
    const teacherId= 'f273ab93-73f9-4c9a-8f2e-447e5da67b5f'
    const courseId='9'
    // upload file
    const {data, error,filePath}= await uploadFile(teacherId,file)
    // insert content 
  
  
  
  }
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    // setUploadSuccess(false);
    // setUploadError(null);
  };

  return (
    <div className="w-[500px]">
      {/* <Button onClick={handleCourseCreateSubmit}>Add Course</Button>

      <form onSubmit={handleCreateLesson}>
            <input type="file" onChange={handleFileChange} />
            <Button type="submit">Add Course</Button>
      </form>
      <embed src={pdf} type="" /> */}
      <LessonForm />
    </div>
  )
}

export default AddCoursePage
 


