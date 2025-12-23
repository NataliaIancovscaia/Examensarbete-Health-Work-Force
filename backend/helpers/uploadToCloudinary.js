import { v2 as cloudinary } from "cloudinary";

export const uploadFileToCloudinary = (
  fileBuffer,
  folder,
  resourceType = "auto",
) => {
  if (!fileBuffer) throw new Error("No file buffer provided");

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );

    uploadStream.end(fileBuffer);
  });
};
