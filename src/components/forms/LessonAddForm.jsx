import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Download, File, TextT, Video } from '@phosphor-icons/react';
import { toast } from 'react-toastify';
import Dropzone from 'react-dropzone';
import { Textarea } from '@/components/ui/textarea';
import { uploadFile, getFile } from '../../services/storageService';
import { createLesson } from '../../services/coursesService';
import TiptapEditor from '../blocks/TiptapEditor';

const LessonAddForm = ({ setOpen,courseId }) => {
    const [content, setContent] = useState('');
    const { register, handleSubmit, watch, formState } = useForm({
        defaultValues: {
            title: 'Chapitre 1',
            content: 'Description du chapitre 1',
            video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            // pdf: '',
        }
    });
    const [isLoading, setIsLoading] = useState(false);

    // Function to convert YouTube URL to embed URL
    const getYouTubeEmbedUrl = (url) => {
        if (!url) return '';
        
        // Handle different YouTube URL formats
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        
        return match && match[2].length === 11
            ? `https://www.youtube.com/embed/${match[2]}`
            : '';
    };

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            console.log(data);

            // upload pdf
            const pdf = data.pdf[0];
            const {data:pdfData,error:pdfError,filePath} = await uploadFile(pdf);
            if(pdfError) throw pdfError;
            const pdfUrl = getFile(filePath);

            // create lesson
            const extractedData = {
                title:data.title,
                content:content,
                video:data.video,
                pdf:pdfUrl,
                course_id:courseId
            }
            const {data:lessonData,error:lessonError} = await createLesson(extractedData);
            if(lessonError) throw lessonError;
            console.log(lessonData);
            setOpen(false);
            toast.success('Chapitre ajouté avec succès');
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
            setOpen(false);

        }
    };

    const formFields = {
        title: {
            label: 'Titre',
            name: 'title',
            type: 'text',
            placeholder: 'Enter the title',
        },
        content: {
            label: 'Contenu',
            name: 'content',
            type: 'text',
            placeholder: 'Entrez le contenu',
        },
        video: {
            label: 'Vidéo (YouTube)',
            name: 'video',
            type: 'text',
            placeholder: 'Collez l’URL de la vidéo YouTube',
        },
        pdf: {
            label: 'Document PDF',
            name: 'pdf',
            type: 'file',
            placeholder: 'Téléversez un fichier PDF',
        },
    };

    const videoUrl = watch('video');
    const embedUrl = getYouTubeEmbedUrl(videoUrl);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 '>
            <div className='flex flex-col gap-4'>
                {/* title */}
                <Label className=''>{formFields.title.label}</Label>
                <div className="relative">
                    <TextT className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <Input {...register(formFields.title.name)} placeholder={formFields.title.placeholder} className="pl-10" />
                </div>

                {/* content */}
                <Label className=''>{formFields.content.label}</Label>
                {/* <Textarea {...register(formFields.content.name)} placeholder={formFields.content.placeholder} className="" /> */}
                <TiptapEditor content={watch(formFields.content.name)} onChange={setContent}/>
                {/* video */}
                <Label className=''>{formFields.video.label}</Label>
                <div className="relative">
                    <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <Input {...register(formFields.video.name)} placeholder={formFields.video.placeholder} className="pl-10" />
                </div>
                
                {/* Video Preview */}
                {embedUrl && (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                        <iframe
                            src={embedUrl}
                            title="YouTube video player"
                            className="absolute top-0 left-0 w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                )}

                {/* pdf accept only pdf files*/}
                <Label className=''>{formFields.pdf.label}</Label>
                <div className="relative">
                    <Download className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <Input type='file' {...register(formFields.pdf.name)} placeholder={formFields.pdf.placeholder} className="pl-10" />
                </div>
            
                
                <Button disabled={isLoading}>
                    {isLoading ? 'Enregistrement...' : 'Enregistrer'}
                </Button>
                {/* display title value */}
                
                 

            </div>
        </form>
    );
};

export default LessonAddForm;
