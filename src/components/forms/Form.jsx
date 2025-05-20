import React from 'react';
import { useForm } from 'react-hook-form';

const Form = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission with the form data
  };

  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields will go here */}
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <input type="submit" />
    </form>
  );
};

export default Form;
