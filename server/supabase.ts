
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || 'https://zsevqsmpvgoipwlhzjoy.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY; // This should be the service_role key for backend operations if possible, or anon key with RLS policies

if (!supabaseKey) {
    console.warn('Missing SUPABASE_KEY environment variable. File uploads may fail.');
}

export const supabase = createClient(supabaseUrl, supabaseKey || '');

export interface UploadResult {
    url: string;
    path: string;
    originalName: string;
}

// Upload a file buffer to Supabase Storage
export async function uploadToSupabase(
    buffer: Buffer,
    originalName: string,
    bucket: string = 'sagedo-orders'
): Promise<UploadResult> {
    const timestamp = Date.now();
    const cleanName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const path = `${timestamp}-${cleanName}`;

    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, buffer, {
            contentType: 'application/octet-stream', // You might want to detect mime type
            upsert: false
        });

    if (error) {
        console.error('Supabase upload error:', error);
        throw error;
    }

    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(path);

    return {
        url: publicUrl,
        path: path,
        originalName
    };
}

// Upload multiple files
export async function uploadMultipleToSupabase(
    files: { buffer: Buffer; originalName: string }[],
    bucket: string = 'sagedo-orders'
): Promise<UploadResult[]> {
    const uploadPromises = files.map((file) =>
        uploadToSupabase(file.buffer, file.originalName, bucket)
    );
    return Promise.all(uploadPromises);
}

// Delete a file from Supabase Storage
export async function deleteFromSupabase(path: string, bucket: string = 'sagedo-orders'): Promise<boolean> {
    const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);

    if (error) {
        console.error('Supabase delete error:', error);
        return false;
    }
    return true;
}
