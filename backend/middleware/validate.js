const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateUpload(req, res, next) {
  if (!req.file) {
    return res.status(400).json({ error: "File is required" });
  }

  if (!req.body.email || !EMAIL_REGEX.test(req.body.email)) {
    return res.status(400).json({ error: "A valid email address is required" });
  }

  next();
}

module.exports = validateUpload;
