import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/input"
import { Label } from "@/components/ui/input"
export function LessonForm({ onSubmit }) {
  
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [pdfName, setPdfName] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setPdfName(e.target.files[0].name);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-4 max-w-xl mx-auto bg-white shadow rounded-2xl"
    >
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="videoUrl">Video URL</Label>
        <Input
          id="videoUrl"
          {...register("videoUrl", {
            required: "Video URL is required",
            pattern: {
              value: /^(https?:\/\/)?([\w.-]+)+[\w-]+(\/[\w.-]*)*\/?$/,
              message: "Enter a valid URL",
            },
          })}
        />
        {errors.videoUrl && (
          <p className="text-sm text-red-500">{errors.videoUrl.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="pdf">PDF File</Label>
        <Input
          id="pdf"
          type="file"
          accept=".pdf"
          {...register("pdf")}
          onChange={handleFileChange}
        />
        {pdfName && (
          <p className="text-sm text-gray-600">Selected: {pdfName}</p>
        )}
      </div>

      <div>
        <Label htmlFor="content">Content</Label>
        <Input
          id="content"
          rows={6}
          {...register("content", { required: "Content is required" })}
        />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
}
