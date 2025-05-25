import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { TextT } from '@phosphor-icons/react';
import { toast } from 'react-toastify';

const Form = ({ setOpen }) => {
  const { register, handleSubmit } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {


    try {
      setIsLoading(true);

      console.log(data)

      setOpen(false)
      toast.success('Action effectuée avec succès')
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
    finally {
      setIsLoading(false);
    }
  };

  const formFields = {
    name: {
      label: 'Nom',
      name: 'name',
      type: 'text',
      placeholder: 'Entrez le nom',
    },

  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 p-4 px-8'>
      <div className='flex flex-col gap-4'>
        <Label className='pb-4'>{formFields.name.label}</Label>
        <div className="relative">
          <TextT className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <Input {...register(formFields.name.name)} placeholder={formFields.name.placeholder} className="pl-10" />
        </div>

        <Button>
        Enregistrer
        </Button>
      </div>
    </form>
  );
};

export default Form;
