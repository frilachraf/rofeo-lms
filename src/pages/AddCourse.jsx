import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/dropzone'
import { useSupabaseUpload } from '@/hooks/use-supabase-upload'
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { data } from 'react-router-dom'
 
const AddCoursePage = () => {
  const props = useSupabaseUpload({
    bucketName: 'rofeo-storage',
    path: 'test',
    allowedMimeTypes: ['image/*'],
    maxFiles: 2,
    maxFileSize: 1000 * 1000 * 10, // 10MB,
  })
  console.log(props.files)
 
  return (
    <div className="w-[500px]">
      <Dropzone {...props}>
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>
      <FileUpload/>
    </div>
  )
}
 


function FileUpload() {
    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [uploadError, setUploadError] = useState(null)
    const [uploadSuccess, setUploadSuccess] = useState(false)
  
    const handleFileUpload = async (e) => {
      e.preventDefault()
      
      if (!file) {
        alert('Please select a file first!')
        return
      }
  
      try {
        setUploading(true)
        setUploadError(null)
        setUploadSuccess(false)
        
        // Generate a unique filename or use the original
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`
  
        // Upload file
        const { error } = await supabase.storage
          .from('rofeo-storage') // Replace with your bucket name
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
            contentType: file.type,
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              )
              setUploadProgress(progress)
            }
          })
  
        if (error) {
          throw error
        }
  
        setUploadSuccess(true)
      } catch (error) {
        setUploadError(error.message)
      } finally {
        setUploading(false)
      }
    }
    const getMedia = (filePath) => {
        const { data: { publicUrl } } = supabase.storage
            .from('rofeo-storage')
            .getPublicUrl(filePath)
            console.log(publicUrl)
        return (publicUrl)
    }
    
    useEffect(()=>{
        const file = getMedia('0.7121078264186819.png')
    })
    return (
      <div>
        <form onSubmit={handleFileUpload}>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            disabled={uploading}
          />
          <button type="submit" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
        
        {uploading && <progress value={uploadProgress} max="100" />}
        {uploadSuccess && <p>File uploaded successfully!</p>}
        {uploadError && <p style={{ color: 'red' }}>Error: {uploadError}</p>}
      </div>
    )
  }
  
  export { AddCoursePage,FileUpload }
