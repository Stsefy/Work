function randomDiap(n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}

function mood(colorsCount) {
  const colors = [
    "",
    "красный",
    "оранжевый",
    "жёлтый",
    "зелёный",
    "голубой",
    "синий",
    "фиолетовый",
  ];
  const usedColors = {};
  console.log("цветов: " + colorsCount);
  for (let i = 1; i <= colorsCount; i++) {
    let randomIndex;
    do {
      randomIndex = randomDiap(1, 7);
    } while (usedColors[randomIndex]);
    usedColors[randomIndex] = true;
    console.log(colors[randomIndex]);
  }
}

mood(3);
