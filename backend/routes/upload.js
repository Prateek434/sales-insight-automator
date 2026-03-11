const { Router } = require("express");
const multer = require("multer");
const validateUpload = require("../middleware/validate");
const parseFile = require("../services/parser");
const generateSummary = require("../services/groq");
const sendEmail = require("../services/mailer");

const ALLOWED_MIMETYPES = [
  "text/csv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIMETYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only CSV and Excel files are allowed"));
    }
  },
});

const router = Router();

router.post(
  "/",
  upload.single("file"),
  validateUpload,
  async (req, res) => {
    try {
      const data = parseFile(req.file.buffer, req.file.mimetype);

      if (!data || data.length === 0) {
        return res.status(400).json({ error: "File contains no valid data" });
      }

      const summary = await generateSummary(data);
      await sendEmail(req.body.email, summary);

      return res.status(200).json({ message: "Summary sent successfully" });
    } catch (err) {
      process.stderr.write(`Upload error: ${err.message}\n`);
      return res.status(500).json({ error: "Failed to process file and send summary" });
    }
  }
);

router.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: "File size must not exceed 5MB" });
    }
    return res.status(400).json({ error: err.message });
  }
  if (err.message === "Only CSV and Excel files are allowed") {
    return res.status(400).json({ error: err.message });
  }
  return res.status(500).json({ error: "An unexpected error occurred" });
});

module.exports = router;
