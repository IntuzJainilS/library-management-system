import multer from "multer";

// export const upload = multer({ dest: 'uploads/' })

const storage = multer.memoryStorage()

export const upload = multer({ storage: storage })