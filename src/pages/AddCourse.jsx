import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseAddForm from '../components/forms/CourseAddForm';

function AddCourse() {
  

  return (
    <div>
      <CourseAddForm />
    </div>
  );
}

export default AddCourse;