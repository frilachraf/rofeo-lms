import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { TextT, TextH, Clock, Image } from '@phosphor-icons/react'
import { Textarea } from '@/components/ui/textarea'
import { uploadThumbnail } from '@/services/storageService';
import { getLevels, updateCourse } from '@/services/coursesService';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select'
import { getFile } from '@/services/storageService';
import { toast } from 'react-toastify';

const CourseEditForm = ({ setOpen, course }) => {
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [levels, setLevels] = useState([]);
    const [level, setLevel] = useState(course?.level_id);

    useEffect(() => {
        // Pre-fill form with course data
        if (course) {
            setValue('title', course.title);
            setValue('description', course.description);
            setValue('duration', course.duration);
            setLevel(course.level_id);
        }
    }, [course, setValue]);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            let thumbnail = course.thumbnail;

            // Only upload new image if one was selected
            if (image) {
                const { data: imageData, error: imageError } = await uploadThumbnail(image);
                if (imageError) {
                    throw imageError;
                }
                thumbnail = getFile(imageData.path);
            }

            const updatedData = {
                ...data,
                thumbnail,
                level_id: level
            };

            const { data: courseData, error: courseError } = await updateCourse(course.id, updatedData);
            
            if (courseError) {
                throw courseError;
            }

            setOpen(false);
            toast.success('Course updated successfully');
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchLevels = async () => {
            const { data, error } = await getLevels();
            if (error) {
                throw error;
            }
            setLevels(data);
        };
        fetchLevels();
    }, []);

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
            placeholder: 'Enter the description',
        },
        duration: {
            label: 'Duration (minutes)',
            name: 'duration',
            placeholder: 'Enter the duration',
        },
        imageLink: {
            label: 'Thumbnail',
            name: 'thumbnail',
            placeholder: 'Enter the image link',
        },
        level: {
            label: 'Level',
            name: 'level',
            placeholder: 'Select the level',
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 p-4 px-8'>
            <h1 className='text-2xl font-bold'>Edit Course</h1>
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
                        <Select onValueChange={(value) => setLevel(value)} defaultValue={course?.level_id}>
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder={formFields.level.placeholder} />
                            </SelectTrigger>
                            <SelectContent className='w-full'>
                                {levels && levels.length > 0 && levels.map((level) => (
                                    <SelectItem key={level.id} value={level.id}>{level?.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Button disabled={isLoading} type='submit'>
                    Update Course
                </Button>
            </div>
        </form>
    );
};

export default CourseEditForm; 