import { supabase } from "../supabaseClient"
import { v4 as uuidv4 } from 'uuid';
export const bucketName = 'rofeofiles'

export const uploadFile = async (file) => {
  const filePath = `/courses/${uuidv4()}`
  const {data, error} = await supabase.storage.from(bucketName).upload(filePath, file, {
    upsert: true,
  })
  return {data,error,filePath}
}
export const getFile = (filePath) => {
    const publicUrl = supabase.storage.from(bucketName).getPublicUrl(filePath).data.publicUrl
    return publicUrl
}
export const attachFile = () => {}
export const getCoursePDF = () => {}


export const listFiles = async (folderPath = '')=> {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .list(folderPath, {
        // limit: 100,
        // offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      })
  
    if (error) {
      console.error('List error:', error)
      return []
    }
    
    return data
  }


export const uploadThumbnail = async (file)=>{
  const filePath = `/thumbnails/${uuidv4()}`
  const {data,error} = await supabase.storage
  .from(bucketName) // your bucket name
  .upload(filePath, file)
  return {data,error,filePath}
}

