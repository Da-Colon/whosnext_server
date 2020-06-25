const fs = require("fs");
const express = require("express");
const multer = require("multer");
const csv = require("fast-csv");
const router = express.Router();
const upload = multer({ dest: "../tmp/csv/" });
const sortData = require('../controllers/parseCSVData')
const {validateCsvData} = require('../controllers/csvValidation')

router.post("/upload-csv", upload.single("file"), function (req, res) {
  const fileRows = [];
  csv.parseFile(req.file.path)
  .on("data", function (data) {
      fileRows.push(data);
    })
    .on("end", function () {
      fs.unlinkSync(req.file.path);  
      const validationError = validateCsvData(fileRows);
      if (validationError) {
        return res.status(403).json({ error: validationError });
      }
      const classList = sortData(fileRows);
      return res.json({ classList })
    })
});


module.exports = router;
