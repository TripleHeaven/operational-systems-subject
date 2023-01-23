// Вариант 8
// функция для нахождения в словарфе по значению
function getByValue(map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (value === searchValue) return key;
  }
}
// обработка значение (удаление всего, кроме букв)
function processStr(str) {
  return str.toUpperCase().replace(/[^А-Я]/gi, "");
}
// алфавит
let alphabetOpen = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
alphabetOpen = alphabetOpen.toUpperCase();
const cryptedMap = new Map();

// фраза
let cryptoPhrase = `Так думал молодой повеса,
                    Летя в пыли на почтовых,
`;
// входное сообщение
let inputPhrase = `В приемах своих господин имел что-то солидное и высмаркивался чрезвычайно громко. 
  Неизвестно, как он это делал, но только нос его звучал, как труба. 
  Это, по-видимому, совершенно невинное достоинство приобрело, 
  однако ж, ему много уважения со стороны трактирного слуги, так что он всякий раз, 
  когда слышал этот звук, встряхивал волосами, спрашивал: не нужно ли чего?`;

let alphabetClosed = [];

let cryptoPhraseProcessed = processStr(cryptoPhrase).split("");
// убирание повторов
cryptoPhraseProcessed = Array.from(
  new Map(cryptoPhraseProcessed.map((item) => [item, 0])).keys()
);
// заполнение закрытого алфавита
for (let i = 0; i < cryptoPhraseProcessed.length; i++) {
  alphabetClosed.push(cryptoPhraseProcessed[i]);
}
for (let i = 0; i < alphabetOpen.length; i++) {
  if (!alphabetClosed.includes(alphabetOpen[i])) {
    alphabetClosed.push(alphabetOpen[i]);
  }
}
// составление таблицы шифрования буква алфавита - буква закрытого алфавита
for (let i = 0; i < alphabetClosed.length; i++) {
  cryptedMap.set(alphabetOpen[i], alphabetClosed[i]);
}

// Шифрование

let inputPhraseTrimmed = processStr(inputPhrase);
let cryptedResult = [];
for (let i = 0; i < inputPhraseTrimmed.length; i++) {
  if ((i + 1) % 5 === 0) {
    cryptedResult.push(" ");
  }
  cryptedResult.push(cryptedMap.get(inputPhraseTrimmed[i]));
}
cryptedResult = cryptedResult.join("");

// Расшифрование
let encryptResult = [];

let cryptedResultTrimmed = processStr(cryptedResult);
for (let i = 0; i < cryptedResultTrimmed.length; i++) {
  if ((i + 1) % 5 === 0) {
    encryptResult.push(" ");
  }
  encryptResult.push(getByValue(cryptedMap, cryptedResultTrimmed[i]));
}
encryptResult = encryptResult.join("");
// зашифрованное сообщение
console.log("Encrypted message", cryptedResult);
// расшифрованное сообщение
console.log("\n\nDecrypted result", encryptResult);
// // исходное сообщение
// console.log("Base message", inputPhrase);
// // таблица шифрования
console.log("\n\nTable", cryptedMap);
