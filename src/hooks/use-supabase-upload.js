import { createClient } from '@/lib/client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { supabase } from '../supabaseClient';

// const supabase = createClient()

const useSupabaseUpload = (options) => {
  const {
    bucketName="rofeofiles",
    path,
    allowedMimeTypes = [],
    maxFileSize = Number.POSITIVE_INFINITY,
    maxFiles = 1,
    cacheControl = 3600,
    upsert = false,
  } = options

  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const [successes, setSuccesses] = useState([])

  const isSuccess = useMemo(() => {
    if (errors.length === 0 && successes.length === 0) {
      return false
    }
    if (errors.length === 0 && successes.length === files.length) {
      return true
    }
    return false
  }, [errors.length, successes.length, files.length])

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    const validFiles = acceptedFiles
      .filter((file) => !files.find((x) => x.name === file.name))
      .map((file) => {
        ;(file).preview = URL.createObjectURL(file)
        ;(file).errors = []
        return file;
      })

    const invalidFiles = fileRejections.map(({ file, errors }) => {
      ;(file).preview = URL.createObjectURL(file)
      ;(file).errors = errors
      return file;
    })

    const newFiles = [...files, ...validFiles, ...invalidFiles]

    setFiles(newFiles)
  }, [files, setFiles])

  const dropzoneProps = useDropzone({
    onDrop,
    noClick: true,
    accept: allowedMimeTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxFileSize,
    maxFiles: maxFiles,
    multiple: maxFiles !== 1,
  })

  const onUpload = useCallback(async (filesToUploadProp) => {
    console.log("onUpload: Starting upload process.");
    setLoading(true)
    setErrors([]) // Clear previous errors on new upload attempt
    setSuccesses([]) // Clear previous successes

    const filesToUse = filesToUploadProp || files; // Use prop if provided, else use state files
    console.log("onUpload: Files to use:", filesToUse);

    // [Joshen] This is to support handling partial successes
    // If any files didn't upload for any reason, hitting "Upload" again will only upload the files that had errors
    const filesWithErrors = errors.map((x) => x.name)
    const filesToUploadFiltered =
      filesWithErrors.length > 0
        ? [
            ...filesToUse.filter((f) => filesWithErrors.includes(f.name)),
            ...filesToUse.filter((f) => !successes.includes(f.name)),
          ]
        : filesToUse
    console.log("onUpload: Filtered files for upload:", filesToUploadFiltered);

    const results = await Promise.all(filesToUploadFiltered.map(async (file) => {
      try {
        const { error, data } = await supabase.storage
          .from(bucketName)
          .upload(!!path ? `${path}/${file.name}` : file.name, file, {
            cacheControl: cacheControl.toString(),
            upsert,
          })
        if (error) {
          console.error(`onUpload: Error uploading ${file.name}:`, error);
          return { name: file.name, message: error.message, error: error }
        } else {
          console.log(`onUpload: Successfully uploaded ${file.name}:`, data);
          return { name: file.name, path: data.path, message: undefined, data: data }
        }
      } catch (uploadError) {
        console.error(`onUpload: Unexpected error during upload for ${file.name}:`, uploadError);
        return { name: file.name, message: uploadError.message, error: uploadError }
      }
    }))
    console.log("onUpload: All upload results:", results);

    const uploadErrors = results.filter((x) => x.error !== undefined)
    const uploadSuccesses = results.filter((x) => x.error === undefined)
    
    setErrors(uploadErrors)
    setSuccesses(Array.from(new Set([...successes, ...uploadSuccesses.map((x) => x.name)])))
    console.log("onUpload: Errors after filter:", uploadErrors);
    console.log("onUpload: Successes after filter:", uploadSuccesses);

    setLoading(false)

    const finalReturn = { data: uploadSuccesses.map(s => s.data), error: uploadErrors.length > 0 ? { message: "One or more files failed to upload.", details: uploadErrors } : null };
    console.log("onUpload: Final return value:", finalReturn);
    return finalReturn;
  }, [files, path, bucketName, errors, successes, cacheControl, upsert]);

  useEffect(() => {
    if (files.length === 0) {
      setErrors([])
    }

    // If the number of files doesn't exceed the maxFiles parameter, remove the error 'Too many files' from each file
    if (files.length <= maxFiles) {
      let changed = false
      const newFiles = files.map((file) => {
        if (file.errors.some((e) => e.code === 'too-many-files')) {
          file.errors = file.errors.filter((e) => e.code !== 'too-many-files')
          changed = true
        }
        return file
      })
      if (changed) {
        setFiles(newFiles)
      }
    }
  }, [files.length, setFiles, maxFiles])

  return {
    files,
    setFiles,
    successes,
    isSuccess,
    loading,
    errors,
    setErrors,
    onUpload,
    maxFileSize: maxFileSize,
    maxFiles: maxFiles,
    allowedMimeTypes,
    ...dropzoneProps,
  }
}

export { useSupabaseUpload };
