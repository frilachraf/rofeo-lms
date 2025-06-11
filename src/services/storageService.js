import { supabase } from "../supabaseClient"
import { v4 as uuidv4 } from 'uuid';

const bucketName = "rofeofiles"

export const uploadFile = async (file) => {
  const filePath = `/courses/${uuidv4()}`
  const {data, error} = await supabase.storage.from(bucketName).upload(filePath, file, {
    upsert: true,
  })
  if (error) throw error;
  return {data,error,filePath}
}

export const getFile = (filePath) => {
  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
  return data.publicUrl;
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

export const uploadUserAvatar = async (userId, file) => {
  if (!file) return { data: null, error: new Error("No file provided.") };

  const fileExtension = file.name.split('.').pop();
  const filePath = `avatars/${userId}/${uuidv4()}.${fileExtension}`;

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      upsert: true,
    });

  if (error) {
    console.error("Error uploading avatar:", error);
    return { data: null, error };
  }

  const publicUrl = supabase.storage.from(bucketName).getPublicUrl(data.path).data.publicUrl;
  return { data: { path: publicUrl }, error: null };
};

