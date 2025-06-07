import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { At, Lock, Tag, TextT, User } from '@phosphor-icons/react';
import { toast } from 'react-toastify';
import { Textarea } from '@/components/ui/textarea';
import { createTeacher } from '../../services/adminServices';

const TeacherAddForm = ({ setOpen }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      full_name: '',
      email: '',
      expertise: '',
      password: 'teacher1234',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {


    try {
      setIsLoading(true);
      const {userAuth} = await createTeacher(data)
      console.log(userAuth)

      setOpen(false)
      toast.success('action successfully')
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
    finally {
      setIsLoading(false);
    }
  };

  const formFields = {
    fullName: {
      label: 'Full Name',
      name: 'full_name',
      placeholder: 'Enter full name',
    },
    email: {
      label: 'Email',
      name: 'email',
      placeholder: 'Teacher email',
    },
    expertise: {
      label: 'expertise',
      name: 'expertise',
      placeholder: 'Teacher expertise',
    },
    password: {
      label: 'Password',
      name: 'password',
      placeholder: 'Teacher password',
    },
    bio: {
      label: 'Bio',
      name: 'bio',
      placeholder: 'biogtaphi',
    },



  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 p-4 px-8'>
      <div className='flex flex-col gap-4'>
        <Label className=''>{formFields.fullName.label}</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <Input {...register(formFields.fullName.name)} placeholder={formFields.fullName.placeholder} className="pl-10" />
        </div>
        <Label className=''>{formFields.email.label}</Label>
        <div className="relative">
          <At className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <Input {...register(formFields.email.name)} placeholder={formFields.email.placeholder} className="pl-10" />
        </div>
        <div className="flex gap-4">
          <div className="">
            <Label className='mb-4'>{formFields.expertise.label}</Label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <Input {...register(formFields.expertise.name)} placeholder={formFields.expertise.placeholder} className="pl-10" />
            </div>
          </div>
          <div className="">
            <Label className='mb-4'>{formFields.password.label}</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <Input type="password" {...register(formFields.password.name)} placeholder={formFields.password.placeholder} className="pl-10" />
            </div>
          </div>
        </div>
        <Label className=''>{formFields.bio.label}</Label>
        <div className="">
          {/* <TextH className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} /> */}
          <Textarea {...register(formFields.bio.name)} placeholder={formFields.bio.placeholder} className="" />
        </div>
        <Button>
          Save
        </Button>
      </div>
    </form>
  );
};

export default TeacherAddForm;
