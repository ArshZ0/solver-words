alphabet = "abcdefghijklmnopqrstuvwxyz";

function countLetters(word) {
  let result = {};
  for (let letter of alphabet) {
    let nb = 0;
    for (let e of word) {
      if (e === letter) nb += 1;
    }
    if (nb > 0) result[letter] = nb;
  }
  return result;
}

const filter = (words, red, yellow, white) => {
  let result = [];
  let next = true;
  for (let word of words.split(",")) {
    let count = countLetters(word);
    next = true;

    if (Object.keys(red)[0] !== "__v") {
      for (let index in red) {
        // Test compatibilité lettres rouge
        if (word[index] !== red[index]) {
          next = false;
          break;
        }
      }
    }
    if (next) {
      // Test compatibilité lettres blanche
      if (Object.keys(white)[0] !== "__v") {
        for (let letter in count) {
          if (Object.keys(white).includes(letter)) {
            if (white[letter] !== count[letter]) {
              next = false;
              break;
            }
          }
        }
      }
      if (next) {
        // Test compatibilité lettres jaune
        for (let letter in yellow) {
          if (letter !== "__v") {
            if (!word.includes(letter)) {
              next = false;
              break;
            } else {
              for (let pos of yellow[letter]) {
                if (word[pos] === letter) {
                  next = false;
                  break;
                }
              }
            }
          }
        }
        if (next) {
          result.push(word);
        }
      }
    }
  }
  return result;
};

module.exports = filter;
