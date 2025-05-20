import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { TextT, TextH, Clock, Image } from '@phosphor-icons/react'
import { Textarea } from '@/components/ui/textarea'
import { uploadThumbnail } from '@/services/storageService';


const CourseAddForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [image, setImage] = useState (null);
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState(null);
    // const [success, setSuccess] = useState(null);
    const handleFileChange = (e) => {
        setImage(e.target.files[0])
      }
    const onSubmit = async (data) => {
    
    console.log(data);
    // Handle form submission with the form data
  
    try {
        setIsLoading(true);
        // const {data,error} = await uploadThumbnail(image)
        // Upload image to supabase storage
        // const { data: uploadData, error: uploadError } = await supabase.storage.from('course-images').upload(image.name, image);
        // if (uploadError) {
        //     throw uploadError;
        // }
        console.log(data);
        
        
    } catch (error) {
        console.error(error)
    }
    finally{
        setIsLoading(false);
    }
    };

  const formFields = {
    title: {                
      label: 'Title',
      name: 'title',
      type: 'text',
      placeholder: 'Enter the title',
    },
    description: {
      label: 'Description',
      name: 'description',
      type: 'text',
      placeholder: 'Enter the description',
    },
    duration: {
      label: 'Duration',
      name: 'duration',
      type: 'number',
      placeholder: 'Enter the duration',
    },
    imageLink: {
      label: 'Thumbnail',
      name: 'thumbnail',
      type: 'file',
      placeholder: 'Enter the image link',
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 p-4 px-8'>
        <h1 className='text-2xl font-bold'>Add Course</h1>
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
                <Input {...register(formFields.duration.name)} placeholder={formFields.duration.placeholder} className="pl-10" />
                </div>
            </div>
        </div>

        <Label>{formFields.description.label}</Label>
        <div className="">
          {/* <TextH className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} /> */}
          <Textarea {...register(formFields.description.name)} placeholder={formFields.description.placeholder} className="" />
        </div>

        

        <Label>{formFields.imageLink.label}</Label>
        <div className="relative">
          <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <Input type="file" accept="image/*" onChange={handleFileChange} placeholder={formFields.imageLink.placeholder} className="pl-10" />
        </div>

        <Button>
          Save
        </Button>
      </div>
    </form>
  );
};

export default CourseAddForm;
