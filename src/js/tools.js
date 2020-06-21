const sortByName = (dataArray) => {
   return dataArray.sort((a, b) => {
      let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
      if (nameA < nameB)
         return -1
      if (nameA > nameB)
         return 1
      return 0
   })
};

const trimLetters = (letters) => {
   const trimedLetters = [];
   let currentLetter = '';
   letters.forEach((letter) => {
      letter = letter.toUpperCase();
      if (letter !== currentLetter) {
         trimedLetters.push(letter);
         currentLetter = letter;
      }
   })
   return trimedLetters
}

/* ============= Export ============= */

export { sortByName, trimLetters }