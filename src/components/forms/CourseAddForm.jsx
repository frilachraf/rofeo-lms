import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { TextT, TextH, Clock, Image } from '@phosphor-icons/react'
import { Textarea } from '@/components/ui/textarea'
import { uploadThumbnail } from '@/services/storageService';
import { getLevels } from '@/services/coursesService';
import { useEffect } from 'react';
import { Select, SelectItem, SelectTrigger, SelectValue , SelectContent} from '@/components/ui/select'
import { createCourse } from '../../services/coursesService';
import { getFile } from '../../services/storageService';
import { toast } from 'react-toastify';

const CourseAddForm = ({setOpen}) => {
    const { register, handleSubmit, formState: { errors },watch } = useForm();
    const [image, setImage] = useState (null);
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [levels, setLevels] = useState([])
    const [level, setLevel] = useState(null)
    // const [error, setError] = useState(null);
    // const [success, setSuccess] = useState(null);
    const handleFileChange = (e) => {
        setImage(e.target.files[0])
      }
    const onSubmit = async (data) => {
    
    // console.log(data);
    // console.log(image)
    // Handle form submission with the form data
  
    try {
        setIsLoading(true);
        // Upload image to supabase storage
        const {data:imageData,error:imageError} = await uploadThumbnail(image)
        
        if(imageError){
            throw imageError
        }
        data.thumbnail = getFile(imageData.path)
        data.level_id = level
        // console.log(data)
        const {data:courseData,error:courseError} = await createCourse('2a1e1609-e6b6-468a-a4fd-3b141ed55038',data)
        // console.log(courseData)
        setOpen(false)
        toast.success('Course created successfully')
    } catch (error) {
        console.error(error)
        toast.error(error.message)
    }
    finally{
        setIsLoading(false);  
    }
    };

  const formFields = {
    title: {                
      label: 'Titre',
      name: 'Titre',
      type: 'text',
      placeholder: 'Entrez le titre',
    },
    description: {
      label: 'Description',
      name: 'Description',
      // type: 'text',
      placeholder: 'Entrez la description',
    },
    duration: {
      label: 'Durée (minutes)',
      name: 'duration',
      // type: 'number',
      placeholder: 'Entrez la durée',
    },
    imageLink: {
      label: 'Miniature',
      name: 'thumbnail',
      // type: 'file',
      placeholder: 'Choisissez une image',
    },
    level: {
      label: 'Niveau',
      name: 'level',
      // type: 'select',
      placeholder: 'Sélectionnez un niveau',
    }
  }

  useEffect(()=>{
    const fetchLevels = async ()=>{
        const {data,error} = await getLevels()
        if(error){
            throw error
        }
        console.log('levelrs',data) 
        setLevels(data)
    }
    fetchLevels()
  },[])
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 p-4 px-8'>
        <h1 className='text-2xl font-bold'>Ajouter un cours</h1>
      <div className='flex flex-col gap-4'>
        <div className="flex gap-4">
            <div className="w-1/2">
            <Label className='pb-4'>{formFields.title.label}</Label>
            <div className="relative">
            <TextT className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <Input {...register(formFields.title.name)} placeholder={formFields.title.placeholder} className="pl-10" />
            </div>
            </div>
            <div className="w-1/2">
                <Label className='pb-4'>{formFields.duration.label}</Label>
                <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <Input type='number' step={30} {...register(formFields.duration.name)} placeholder={formFields.duration.placeholder} className="pl-10" />
                </div>
            </div>
        </div>

        <Label>{formFields.description.label}</Label>
        <div className="">
          {/* <TextH className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} /> */}
          <Textarea {...register(formFields.description.name)} placeholder={formFields.description.placeholder} className="" />
        </div>

        

        <div className="flex gap-4">
          <div className="w-1/2">
            <Label className='pb-4'>{formFields.imageLink.label}</Label>
            <div className="relative">
              <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <Input type="file" accept="image/*" onChange={handleFileChange} placeholder={formFields.imageLink.placeholder} className="pl-10" />
            </div>
          </div>
          <div className="w-1/2">
            <Label className='pb-4'>{formFields.level.label}</Label>
            <Select onValueChange={(value)=>setLevel(value)}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder={formFields.level.placeholder} />
              </SelectTrigger>
              <SelectContent className='w-full'>
                {levels && levels.length > 0 && levels.map((level)=>(
                  <SelectItem key={level.id} value={level.id}>{level?.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {level}
        {watch('title')}
        {watch('description')}
        {watch('duration')}
        {watch('thumbnail')}
          
          <Button disabled={isLoading} type='submit'>
            Save
          </Button>
      
      </div>
    </form>
  );
};

export default CourseAddForm;
