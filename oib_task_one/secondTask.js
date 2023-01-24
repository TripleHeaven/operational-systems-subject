// обработка значение (удаление всего, кроме букв)
function processStr(str) {
  return str.toUpperCase().replace(/[^А-Я]/gi, "");
}

// входное сообщение
let inputStr = `В приемах своих господин имел что-то солидное и высмаркивался чрезвычайно громко. 
  Неизвестно, как он это делал, но только нос его звучал, как труба. 
  Это, по-видимому, совершенно невинное достоинство приобрело, 
  однако ж, ему много уважения со стороны трактирного слуги, так что он всякий раз, 
  когда слышал этот звук, встряхивал волосами, спрашивал: не нужно ли чего?`;

let alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";

// Построение числовой последовательности
let cypherPhrase = "БУРОВ";
let numberSequence = [];
// Отсортируем буквы в слове в порядке слева направо в алфавите
let sortedPhrase = cypherPhrase
  .split("")
  .sort((a, b) => a.charCodeAt() - b.charCodeAt());
// Заполним массив порядком в алфавите с отсортированном слове
for (let i = 0; i < sortedPhrase.length; i++) {
  numberSequence.push({ letter: sortedPhrase[i], value: i + 1 });
}
// Заполним массив порядком в алфавите с исходном слове
let numberSequenceResult = [];
for (let i = 0; i < cypherPhrase.length; i++) {
  let numberSequenceIndexOfCurrentLetter = numberSequence.findIndex(
    (elem) => elem.letter === cypherPhrase[i]
  );
  numberSequenceResult.push({
    letter: cypherPhrase[i],
    value: numberSequence[numberSequenceIndexOfCurrentLetter].value,
  });
  numberSequence.splice(numberSequenceIndexOfCurrentLetter, 1);
}

// обрабатываем входную строку и помечаем каждый символ номером столбца

// индекс на символ числовой последовательности
let currentIndexOfSequence = 0;
let resultLeeterToColumnNum = [];
let inputPhraseProcessed = processStr(inputStr);

for (let i = 0; i < inputPhraseProcessed.length; i++) {
  resultLeeterToColumnNum.push({
    letter: inputPhraseProcessed[i],
    // в значении указываем номер столбцы
    column: numberSequenceResult[currentIndexOfSequence].value,
  });
  // циклично проходимся по номерам столбцов
  if (currentIndexOfSequence === numberSequenceResult.length - 1) {
    currentIndexOfSequence = 0;
  } else {
    currentIndexOfSequence += 1;
  }
}
// Отсортируем полученный массив по столбцам и оставим только буквы
resultLeeterToColumnNum = resultLeeterToColumnNum.sort(
  (a, b) => a.column - b.column
);

let encryptedResult = [];
// делим зашифрованное сообщение на группы по 5 букв
for (let i = 0; i < resultLeeterToColumnNum.length; i++) {
  encryptedResult.push(resultLeeterToColumnNum[i].letter);
  if ((i + 1) % 5 === 0) {
    encryptedResult.push(" ");
  }
}
// Выводим зашифрованное сообщение
console.log("Encrypted result", encryptedResult.join(""));

// Расшифруем сообщение
// Приводим строку к общему виду , убираем пробемы
encryptedResult = processStr(encryptedResult.join(""));

let decryptedResult = [];
// количество столбцов - numberSequenceResult.length
// количество символов в одном столбце
const numsInOneColumn = Math.ceil(
  encryptedResult.length / numberSequenceResult.length
);

// Восстанавливаем количество символов в каждой колонке
let symbolsToColumns = {};
let currentSymbolsQuantity = 0;
let currentSequenceNumberIndex = 0;
for (let i = 0; i < encryptedResult.length; i++) {
  currentSymbolsQuantity += 1;
  symbolsToColumns[numberSequenceResult[currentSequenceNumberIndex].value] = {
    quantity: currentSymbolsQuantity,
  };
  if (currentSymbolsQuantity === numsInOneColumn) {
    currentSymbolsQuantity = 0;
    currentSequenceNumberIndex += 1;
  }
}

// Восстанавливам символы в колонке
let symbolToColumn = [];
let currentColumn = 1;
// Количество обработанных символов в итерации
let currentSymbols = 0;
for (let i = 0; i < encryptedResult.length; i++) {
  currentSymbols += 1;
  symbolToColumn.push({ letter: encryptedResult[i], column: currentColumn });
  if (
    currentSymbols === numsInOneColumn ||
    currentSymbols === symbolsToColumns[currentColumn].quantity
  ) {
    currentSymbols = 0;
    currentColumn += 1;
  }
}

// функция, которая возвращает первый символ
function top(arr) {
  return arr[0];
}

while (true) {
  if (!top(symbolToColumn)) {
    break;
  }
  for (let i = 0; i < numberSequenceResult.length; i++) {
    decryptedResult.push(
      symbolToColumn.splice(
        symbolToColumn.findIndex(
          (item) => item.column === numberSequenceResult[i].value
        ),
        1
      )[0]?.letter
    );
  }
}
decryptedResult = processStr(decryptedResult.join(""));
let decryptedResultString = [];
for (let i = 0; i < decryptedResult.length; i++) {
  decryptedResultString.push(decryptedResult[i]);
  if ((i + 1) % 5 === 0) {
    decryptedResultString.push(" ");
  }
}
console.log("Decrypted message", decryptedResultString.join(""));
