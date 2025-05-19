import { supabase } from "../supabaseClient"
export const bucketName = 'rofeofiles'

export const uploadFile = async (filePath,file) => {
  const {data, error} = await supabase.storage.from(bucketName).upload(filePath, file, {
    upsert: true,
  })
  return {data, error}
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

