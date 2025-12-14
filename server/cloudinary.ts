import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dj6mbfg9c',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
    url: string;
    publicId: string;
    originalName: string;
}

// Upload a file buffer to Cloudinary
export async function uploadToCloudinary(
    buffer: Buffer,
    originalName: string,
    folder: string = 'sagedo-orders'
): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: 'auto', // Automatically detect file type
                public_id: `${Date.now()}-${originalName.replace(/\.[^/.]+$/, '')}`, // Remove extension for public_id
            },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    reject(error);
                } else if (result) {
                    resolve({
                        url: result.secure_url,
                        publicId: result.public_id,
                        originalName,
                    });
                } else {
                    reject(new Error('No result from Cloudinary'));
                }
            }
        );

        uploadStream.end(buffer);
    });
}

// Upload multiple files
export async function uploadMultipleToCloudinary(
    files: { buffer: Buffer; originalName: string }[],
    folder: string = 'sagedo-orders'
): Promise<UploadResult[]> {
    const uploadPromises = files.map((file) =>
        uploadToCloudinary(file.buffer, file.originalName, folder)
    );
    return Promise.all(uploadPromises);
}

// Delete a file from Cloudinary
export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result.result === 'ok';
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        return false;
    }
}

export default cloudinary;
