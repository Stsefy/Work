"use strict";
let word = prompt("Введите слово");

function vowelsForEach(str) {
  word = word.toLowerCase();
  let arrWord = word.split("");
  const arrVowels = ["а", "о", "е", "и", "у", "я", "ю", "ы", "э", "ё"];
  let counterForEach = 0;
  arrWord.forEach((v) => {
    if (arrVowels.includes(v)) {
      counterForEach++;
    }
  });
  return counterForEach;
}

function vowelsFilter(str) {
  word = word.toLowerCase();
  let arrWord = word.split("");
  const arrVowels = ["а", "о", "е", "и", "у", "я", "ю", "ы", "э", "ё"];
  let counterFilter = arrWord.filter((v) => arrVowels.includes(v)).length;
  return counterFilter;
}

function vowelsReduse(str) {
  word = word.toLowerCase();
  let arrWord = word.split("");
  const arrVowels = ["а", "о", "е", "и", "у", "я", "ю", "ы", "э", "ё"];
  let counterReduse = arrWord.reduce((r, v) => {
    if (arrVowels.includes(v)) {
      r++;
    }
    return r;
  }, 0);
  return counterReduse;
}

const countByForEach = vowelsForEach(word);
const countByFilter = vowelsFilter(word);
const countByReduce = vowelsReduse(word);

alert(`
Результат подсчета методом forEach: ${countByForEach}
Результат подсчета методом filter: ${countByFilter}
Результат подсчета методом reduce: ${countByReduce}
`);
