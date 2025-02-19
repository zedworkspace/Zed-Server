import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinary";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary,
//   params: async (req, file) => {
//     return {
//       folder: "projects",
//     };
//   },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    // const error = new CustomError("Unsupported file format", 400);
    // cb(error, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

export default upload;
