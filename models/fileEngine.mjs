import multer from "multer";
import root from "../util/root.mjs";
import path from "path";
const fileStorageEngine = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, path.join(root, "../../", "img", "images"));
  },
  filename: (req, file, cb) => {
    const nameFile = file.originalname;
    const convertName = nameFile.split(" ").join("-");
    cb(null, Date.now() + convertName);
  },
});

const upload = multer({storage: fileStorageEngine});

export default upload;