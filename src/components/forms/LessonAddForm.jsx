import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/input"
import { Label } from "@/components/ui/Label"
export function LessonForm({ onSubmit }) {
  
//     const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const [pdfName, setPdfName] = useState(null);

//   const handleFileChange = (e) => {
//     if (e.target.files?.[0]) {
//       setPdfName(e.target.files[0].name);
//     }
//   };
    const errorRef = useRef(null)
    const form =useForm({
        defaultValues:{
            
        }
    })
    const formFields = {
        content:{
            name: 'content',
            placeholder: 'Write your content here' ,
            label: 'contenu',

        },
        video:{},
        title:{},
    }
  return (
    <div className="">
        <form action="">

        </form>
    </div>
  );
}
