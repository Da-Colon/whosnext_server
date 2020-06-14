const sortData = (rowsArray) => {
  const classList = []
  for(let i = 1; i <= rowsArray.length - 1; i++){
    let firstName = rowsArray[i][0].charAt(0).toUpperCase() + rowsArray[i][0].slice(1).toLowerCase();
    let lastNameLetter = rowsArray[i][1].charAt(0).toUpperCase();
    classList.push(firstName + " " + lastNameLetter + ".");
  }
  return classList;
}

module.exports = sortData