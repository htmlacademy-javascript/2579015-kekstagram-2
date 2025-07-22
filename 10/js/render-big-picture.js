import {makeElement, openModal, closeModal, onKeydownEscHandler, addEventListeners, removeEventListeners} from './dom-utils.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsContainer = bigPicture.querySelector('.social__comments');
const buttonClose = bigPicture.querySelector('.big-picture__cancel');
const buttonDownload = bigPicture.querySelector('.comments-loader');
const COUNT_ITERATION = 5;
let currentCount = 0;

const onKeydownHandlers = [
  { element: document, handler: onKeydownEscBigPictureHandler }
];

const onClickHandlers = [
  { element: buttonClose, handler: onClickCloseButtonHandler },
  { element: buttonDownload, handler: showNextComments}
];

// Получить массив комментариев
const getComments = () => {
  const commentsNodeList = commentsContainer.querySelectorAll('.social__comment');
  return Array.from(commentsNodeList);
};

// Создание элемента комментария
const createComment = (comment) => {
  const newComment = makeElement('li', 'social__comment');
  const newCommentAvatar = makeElement('img', 'social__picture');
  const newCommentText = makeElement('p', 'social__text', comment.message);
  newCommentAvatar.src = comment.avatar;
  newCommentAvatar.alt = comment.name;
  newCommentAvatar.width = '35';
  newCommentAvatar.height = '35';
  newComment.classList.add('hidden');
  newComment.appendChild(newCommentAvatar);
  newComment.appendChild(newCommentText);
  return newComment;
};

// Создание комментариев и добавлении их к bigPicture
const initComments = (comments) => {
  commentsContainer.innerHTML = '';
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentItem = createComment(comment);
    fragment.appendChild(commentItem);
  });

  commentsContainer.appendChild(fragment);
};

// Обновить количество показанных комментариев
const updateCounterComments = () => {
  const shownComments = getComments().filter((comment) => !comment.classList.contains('hidden'));
  commentShownCount.textContent = shownComments.length;
};

// Показать комментарии
function showNextComments() {
  const slicedComments = getComments().slice(currentCount, currentCount + COUNT_ITERATION);

  slicedComments.forEach((element) => {
    element.classList.remove('hidden');
  });

  currentCount += COUNT_ITERATION;
  updateCounterComments();

  if (currentCount >= getComments().length) {
    buttonDownload.classList.add('hidden');
  }
}

// Открытие окна
const openBigPicture = () => {
  currentCount = 0;
  openModal(bigPicture);
  buttonDownload.classList.remove('hidden');
  addEventListeners('keydown', onKeydownHandlers);
  addEventListeners('click', onClickHandlers);
};

// Закрытие окна
const сloseBigPicture = () => {
  closeModal(bigPicture);
  removeEventListeners('keydown', onKeydownHandlers);
  removeEventListeners('click', onClickHandlers);
};

// Обработчик события нажатия Escape
function onKeydownEscBigPictureHandler (evt) {
  onKeydownEscHandler(evt, сloseBigPicture);
}

// Обработчик события нажатия на кнопку закрыть
function onClickCloseButtonHandler(evt) {
  evt.preventDefault();
  сloseBigPicture();
}

// Обработчик нажатия на миниатюру
const onClickPictureHandler = (post) => {
  openBigPicture();

  bigPictureImage.src = post.url;
  bigPicture.querySelector('.likes-count').textContent = post.likes;
  bigPicture.querySelector('.social__comment-total-count').textContent = post.comments.length;
  bigPicture.querySelector('.social__caption').textContent = post.description;

  initComments(post.comments);
  showNextComments();
};

export {onClickPictureHandler};
