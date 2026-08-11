import { supabase } from './client';

export interface UpdateItem {
  id: string;
  image_url: string;
  caption: string;
  property_type: string;
  visibility: string;
  created_at: string;
}

export const getAllUpdates = async (): Promise<UpdateItem[]> => {
  const { data, error } = await supabase
    .from('updates')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
};

export const getPublicUpdates = async (): Promise<UpdateItem[]> => {
  const { data, error } = await supabase
    .from('updates')
    .select('*')
    .eq('visibility', 'live')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
};

export const addUpdate = async (update: { image_url: string; caption: string; property_type: string }) => {
  const { data, error } = await supabase
    .from('updates')
    .insert([{ ...update, visibility: 'live' }])
    .select();
  if (error) throw error;
  return data;
};

export const deleteUpdate = async (id: string) => {
  const { error } = await supabase.from('updates').delete().eq('id', id);
  if (error) throw error;
};

export const uploadUpdateImage = async (file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop() || 'jpg';
  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const path = `updates/${Date.now()}-${cleanName}`;
  const { error } = await supabase.storage
    .from('property-images')
    .upload(path, file, { upsert: true });
  if (error) throw error;
  const { data } = supabase.storage.from('property-images').getPublicUrl(path);
  return data.publicUrl;
};
