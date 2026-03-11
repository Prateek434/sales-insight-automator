const { parse } = require("csv-parse/sync");
const XLSX = require("xlsx");

function parseFile(buffer, mimetype) {
  if (mimetype === "text/csv") {
    return parse(buffer, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });
  }

  const workbook = XLSX.read(buffer, { type: "buffer" });
  const firstSheetName = workbook.SheetNames[0];
  return XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);
}

module.exports = parseFile;
