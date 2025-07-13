import {makeElement} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img').firstElementChild;
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsContainer = bigPicture.querySelector('.social__comments');
const buttonClose = bigPicture.querySelector('.big-picture__cancel');
const buttonDownload = bigPicture.querySelector('.comments-loader');

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
  const shownComments = commentsContainer.querySelectorAll('.social__comment:not(.hidden)');
  commentShownCount.textContent = shownComments.length;
};

// Показать комментарии
const showComments = () => {
  const comments = commentsContainer.querySelectorAll('.social__comment');

  comments.forEach((element) => {
    element.classList.remove('hidden');
  });

  updateCounterComments();
};

// Открытие окна
const openBigPicture = () => {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  buttonDownload.classList.add('hidden');
  addEventListenerClose();
};

// Закрытие окна
const сloseBigPicture = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  buttonDownload.classList.remove('hidden');
  removeEventListenerClose();
};

// Обработчик события нажатия Escape
const onKeydownEscHandler = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    сloseBigPicture();
  }
};

// Обработчик события нажатия на кнопку закрыть
const onClickCloseButtonHandler = (evt) => {
  evt.preventDefault();
  сloseBigPicture();
};

// Удаление событий закрытия
function removeEventListenerClose() {
  document.removeEventListener('keydown', onKeydownEscHandler);
  buttonClose.removeEventListener('click', onClickCloseButtonHandler);
}

// Добавление событий закрытия
function addEventListenerClose() {
  document.addEventListener('keydown', onKeydownEscHandler);
  buttonClose.addEventListener('click', onClickCloseButtonHandler);
}

// Обработчик нажатия на миниатюру
const onClickPictureHandler = (post) => {
  openBigPicture();

  bigPictureImage.src = post.url;
  bigPicture.querySelector('.likes-count').textContent = post.likes;
  commentShownCount.textContent = post.comments.length;
  bigPicture.querySelector('.social__comment-total-count').textContent = post.comments.length;
  bigPicture.querySelector('.social__caption').textContent = post.description;

  initComments(post.comments);
  showComments();
};

export {onClickPictureHandler};
