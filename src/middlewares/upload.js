import multer from 'multer';
import { __dirname } from '../../root.js';
import { join } from 'path';

const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, join(__dirname, 'uploads'));
        },
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}-${file.originalname}`);
        }
    }
);

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

        if (!allowedMimeTypes.includes(file.mimetype)) {
            cb(new Error('Invalid image type. Only PNG, JPG, JPEG, and GIF allowed.'));
        }
        else if (file.size > 1024 * 1024) {
            cb(new Error('File size exceeds 1MB limit.'));
        }
        else {
            cb(null, true);
        }
    },
});

export { upload };