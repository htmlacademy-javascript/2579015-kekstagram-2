/* Модуль работы с комментариями */
import {getRandomInteger, getUniqueRandomInteger, getRandomItem, getRandomOneOrTwo} from './utils.js';

const MIN_NUMBER_COMMENTS = 0;
const MAX_NUMBER_COMMENTS = 30;
const MIN_NUMBER_AVATAR = 1;
const MAX_NUMBER_AVATAR = 6;

// Функция создания комментариев
function createConstructorComment(inputData) {
  const commentId = getUniqueRandomInteger();

  return function() {
    return {
      id: commentId(),
      avatar: `img/avatar-${getRandomInteger(MIN_NUMBER_AVATAR, MAX_NUMBER_AVATAR)}.svg`,
      message: getRandomOneOrTwo(inputData.MESSAGES),
      name: getRandomItem(inputData.NAMES)
    };
  };
}

// Создать комментарии к посту
function getComments(inputData) {
  const countComments = getRandomInteger(MIN_NUMBER_COMMENTS, MAX_NUMBER_COMMENTS);
  const generateComment = createConstructorComment(inputData);
  const comments = Array.from({ length : countComments }, () => generateComment());

  return comments;
}

export {getComments};
