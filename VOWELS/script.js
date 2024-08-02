function Vowels(str) {
  word = word.toLowerCase();
  const vowels = { а: 1, о: 1, е: 1, и: 1, у: 1, я: 1, ю: 1, ы: 1, э: 1, ё: 1 };
  let counter = 0;
  for (let i = 0; i < word.length; i++) if (word[i] in vowels) counter++;
  return counter;
}

let word = prompt("Введите слово");
alert(Vowels(word));
