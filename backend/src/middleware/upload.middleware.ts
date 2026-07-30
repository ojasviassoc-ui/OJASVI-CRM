import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads/");
  },

  filename: (_req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName + path.extname(file.originalname)
    );
  },
});

const fileFilter: multer.Options["fileFilter"] = (
  _req,
  file,
  cb
) => {
  const allowed = [
    ".xlsx",
    ".xls",
    ".csv",
  ];

  const extension = path.extname(file.originalname).toLowerCase();

  if (allowed.includes(extension)) {
    cb(null, true);
  } else {
    cb(new Error("Only Excel and CSV files are allowed."));
  }
};

export const upload = multer({
  storage,
  fileFilter,
});