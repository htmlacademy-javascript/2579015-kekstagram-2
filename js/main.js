const NUMBER_PHOTOS = 25;

const MIN_NUMBER_LIKES = 15;

const MAX_NUMBER_LIKES = 200;

const MIN_NUMBER_COMMENTS = 0;

const MAX_NUMBER_COMMENTS = 30;

const MIN_NUMBER_AVATAR = 1;

const MAX_NUMBER_AVATAR = 6;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const DESCRIPTIONS = [
  'Интересный момент.',
  'Время остановилось.',
  'Что-то особенное.',
  'Взгляд в будущее.',
  'Мгновение счастья.',
  'Просто так.',
  'Необычный кадр.',
  'Вдохновение внутри.',
  'Моменты жизни.',
  'Вся суть в деталях.',
  'Что-то важное.',
  'Обычный день, необычное фото.',
  'Время и пространство.',
  'Просто красиво.',
  'Мгновение для памяти.',
  'Неожиданное сочетание.',
  'Взгляд со стороны.',
  'Всё начинается здесь и сейчас.',
  'Момент, который стоит запомнить.',
  'Немного магии в обычном дне.',
  'В каждом кадре есть история.',
  'Просто и красиво.',
  'Вдохновляющий момент.',
  'Обычное — необычное.',
  'Всё, что нужно — это взгляд.'
];

const NAMES = ['Алексей', 'Мария', 'Дмитрий', 'Елена', 'Иван', 'Ольга', 'Сергей', 'Анастасия', 'Михаил', 'Наталья', 'Владимир'];

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

// Функция создания постов
function createConstructorPost() {
  let postId = 1;

  return function() {
    return {
      id: postId,
      url: `photos/${postId++}.jpg`,
      description: getRandomItem(DESCRIPTIONS),
      likes: getRandomInteger(MIN_NUMBER_LIKES, MAX_NUMBER_LIKES),
      comments: getComments()
    };
  };
}

// Функция создания комментариев
function createConstructorComment() {
  const commentId = getUniqueRandomInteger();

  return function() {
    return {
      id: commentId(),
      avatar: `img/avatar-${getRandomInteger(MIN_NUMBER_AVATAR, MAX_NUMBER_AVATAR)}.svg`,
      message: getRandomOneOrTwo(MESSAGES),
      name: getRandomItem(NAMES)
    };
  };
}

// Создать комментарии к посту
function getComments() {
  const countComments = getRandomInteger(MIN_NUMBER_COMMENTS, MAX_NUMBER_COMMENTS);
  const generateComment = createConstructorComment();
  const comments = Array.from({ length : countComments }, () => generateComment());

  return comments;
}

// Создать посты заданного количества
function createPosts(countPosts) {
  const generatePost = createConstructorPost();
  const posts = Array.from({ length : countPosts }, () => generatePost());

  return posts;
}

console.log(createPosts(NUMBER_PHOTOS));
