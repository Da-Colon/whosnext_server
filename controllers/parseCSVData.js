const sortData = (rowsArray) => {
  const classList = []
  for(let i = 1; i <= rowsArray.length - 1; i++){
    let firstName = rowsArray[i][0];
    let lastNameLetter = rowsArray[i][1].charAt(0);
    classList.push(firstName + " " + lastNameLetter + ".");
  }
  return classList;
}

module.exports = sortData