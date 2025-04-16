// uploadMiddleware.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// تحديد نوع الملفات المسموح بها
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']; // أنواع الصور المسموح بها
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);  // يسمح بالملف
    } else {
        cb(new Error('Only image files are allowed'), false);  // إذا كان الملف ليس صورة، يتم إرجاع خطأ
    }
};

// التأكد من وجود مجلد 'uploads' وإذا لم يكن موجودًا نقوم بإنشائه
const checkUploadsFolder = () => {
    const uploadsDir = 'uploads';
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);  // إنشاء المجلد إذا لم يكن موجودًا
    }
};

// إعدادات التخزين
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        checkUploadsFolder();  // التأكد من وجود المجلد
        cb(null, 'uploads/');  // تحديد الوجهة التي سيتم تخزين الملفات فيها
    },
    filename: (req, file, cb) => {
        // اسم الملف الجديد: إضافة timestamp لتفادي تكرار الاسم
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
});

// إعداد multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,  // التحقق من نوع الملف
    limits: { fileSize: 10 * 1024 * 1024 },  // تحديد الحد الأقصى لحجم الملف (10MB)
});

export default upload;
