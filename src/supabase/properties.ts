import { supabase } from './client';

// Get all live properties (for public website)
export const getPublicProperties = async () => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('visibility', 'live')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

// Get all properties (for admin panel)
export const getAllProperties = async () => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

// Add new property
export const addProperty = async (property: any) => {
  const { data, error } = await supabase
    .from('properties')
    .insert([property])
    .select();
  if (error) throw error;
  return data;
};

// Update property
export const updateProperty = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from('properties')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data;
};

// Delete property
export const deleteProperty = async (id: string) => {
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

// Upload image to Supabase Storage
export const uploadImage = async (file: File, path: string) => {
  const { error } = await supabase.storage
    .from('property-images')
    .upload(path, file, { upsert: true });
  if (error) throw error;
  
  const { data } = supabase.storage
    .from('property-images')
    .getPublicUrl(path);
  return data.publicUrl;
};

// Delete image from Supabase Storage
export const deleteImage = async (path: string) => {
  const { error } = await supabase.storage
    .from('property-images')
    .remove([path]);
  if (error) throw error;
};

// Save report to reports table
export const saveReport = async (report: any) => {
  const { data, error } = await supabase
    .from('reports')
    .insert([report])
    .select();
  if (error) throw error;
  return data;
};

// Get all reports
export const getReports = async () => {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);
  if (error) throw error;
  return data;
};
