import {hasDuplicates} from './utils.js';
import {onKeydownEscHandler, openModal, closeModal, addEventListeners, removeEventListeners} from './dom-utils.js';

const form = document.querySelector('.img-upload__overlay');
const inputFile = document.querySelector('.img-upload__input');
const buttonClose = document.querySelector('.img-upload__cancel');
const inputHashtags = document.querySelector('.text__hashtags');
const description = document.querySelector('.text__description');

const DESCRIPTION_REGEXP = /^.{0,140}$/;
const LIMIT_COUNT_HASHTAG = 5;
let errorMessage = '';

const rules = [
  {
    check: (value) => /^#.*$/.test(value),
    error: 'Хэштег должен начинаться с символа # (решётка)'
  },
  {
    check: (value) => /^#.+$/.test(value),
    error: 'Хеш-тег не может состоять только из одной решётки'
  },
  {
    check: (value) => /^#.{1,20}$/.test(value),
    error: 'Максимальная длина одного хэштега 20 символов, включая решётку'
  },
  {
    check: (value) => /^#[a-zа-яё0-9]+$/i.test(value),
    error: 'Строка после решётки должна состоять из букв и чисел'
  }
];

const handlers = [
  { element: document, handler: onKeydownEscFormHandler },
  { element: inputHashtags, handler: onKeydownEscFieldHandler },
  { element: description, handler: onKeydownEscFieldHandler }
];

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

const getErrorMessage = () => errorMessage;

function onKeydownEscFormHandler(evt) {
  onKeydownEscHandler(evt, closeForm);
}

function onKeydownEscFieldHandler(evt) {
  onKeydownEscHandler(evt, () => evt.stopPropagation());
}

// Закрытие формы
function closeForm () {
  closeModal(form);

  removeEventListeners('click', [{element: buttonClose, handler: closeForm}]);
  removeEventListeners('keydown', handlers);

  inputFile.value = '';
}

// Открытие формы
const openForm = () => {
  openModal(form);
  addEventListeners('click', [{element: buttonClose, handler: closeForm}]);
  addEventListeners('keydown', handlers);
};

// Проверка хэштегов
const checkHashtags = () => {
  const hashtags = inputHashtags.value.trim().split(/\s+/).filter(Boolean);

  if (hashtags.length > LIMIT_COUNT_HASHTAG) {
    errorMessage = 'Нельзя указать больше пяти хэштегов';
    return false;
  }

  for (const hashtag of hashtags) {
    for (const rule of rules) {
      if (!rule.check(hashtag)) {
        errorMessage = rule.error;
        return false;
      }
    }
  }

  // Проверка на дублирование
  const lowercased = hashtags.map((item) => item.toLowerCase());
  if (hasDuplicates(lowercased)) {
    errorMessage = 'Один и тот же хэштег не может быть использован дважды';
    return false;
  }

  return true;
};

inputFile.addEventListener('change', openForm);

pristine.addValidator(inputHashtags, checkHashtags, getErrorMessage);
pristine.addValidator(description, () => DESCRIPTION_REGEXP.test(description.value), 'Длина комментария не может составлять больше 140 символов.');

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
