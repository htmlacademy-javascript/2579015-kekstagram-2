/* Модуль для вспомогательных функций */

// Получить случайное число из заданного диапазона
function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

// Получить уникальное случайное число
function getUniqueRandomInteger() {
  const previousValues = [];

  return function () {
    let currentValue;
    do {
      currentValue = Math.floor(Math.random() * Date.now());
    } while(previousValues.includes(currentValue));

    previousValues.push(currentValue);
    return currentValue;
  };
}

// Получить случайный элемент массива
function getRandomItem(array) {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
}

// Получить перемешанный массив (алгоритм Фишера-Йетса)
function shuffleArray(arr) {
  const array = arr.slice();

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

// Получить одно или два случайных элемента из массива
function getRandomOneOrTwo(arr) {
  const count = getRandomInteger(1, 2);
  const mixedArr = shuffleArray(arr);

  if(count === 1) {
    return mixedArr[0];
  }
  return mixedArr[0] + mixedArr[1];
}

// Создание элемента разметки с заданным классом и заполненным текстом
function makeElement(tagName, className, text) {
  const newElement = document.createElement(tagName);
  newElement.classList.add(className);

  if(text) {
    newElement.textContent = text;
  }

  return newElement;
}

export {getRandomInteger, getUniqueRandomInteger, getRandomItem, getRandomOneOrTwo, makeElement};
