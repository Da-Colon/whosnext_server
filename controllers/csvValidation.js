function validateCsvData(rows) {
  const dataRows = rows.slice(1, rows.length); //ignore header at 0 and get rest of the rows
  for (let i = 0; i < dataRows.length; i++) {
    const rowError = validateCsvRow(dataRows[i]);
    if (rowError) {
      return `${rowError} on row ${i + 1}`
    }
  }
  return;
}

function validateCsvRow(row) {
  if (!row[0]) {
    return "invalid first name field"
  }
  else if (!row[1]) {
    return "invalid last name field"
  }
  return;
}

module.exports = {validateCsvData, validateCsvRow}