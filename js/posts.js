/* Модуль работы с постами */
import {getRandomInteger, getRandomItem} from './utils.js';
import {getComments} from './comments.js';

const NUMBER_POSTS = 25;
const MIN_NUMBER_LIKES = 15;
const MAX_NUMBER_LIKES = 200;

// Функция создания постов
function createConstructorPost(inputData) {
  let postId = 1;

  return function() {
    return {
      id: postId,
      url: `photos/${postId++}.jpg`,
      description: getRandomItem(inputData.DESCRIPTIONS),
      likes: getRandomInteger(MIN_NUMBER_LIKES, MAX_NUMBER_LIKES),
      comments: getComments(inputData)
    };
  };
}

// Создать посты заданного количества
function createPosts(inputData, countPosts = NUMBER_POSTS) {
  const generatePost = createConstructorPost(inputData);
  const posts = Array.from({ length : countPosts }, () => generatePost());

  return posts;
}

export {createPosts};
