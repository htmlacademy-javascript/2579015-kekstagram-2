import {sendData} from './api.js';
import {hasDuplicates} from './utils.js';
import {onKeydownEscHandler, openModal, closeModal, addEventListeners, removeEventListeners} from './dom-utils.js';
import {addSliderEffects, removeSliderEffects} from './effects.js';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const inputFile = document.querySelector('.img-upload__input');
const buttonClose = document.querySelector('.img-upload__cancel');
const buttonSubmit = document.querySelector('.img-upload__submit');
const inputHashtags = document.querySelector('.text__hashtags');
const description = document.querySelector('.text__description');

const DESCRIPTION_REGEXP = /^.{0,140}$/;
const LIMIT_COUNT_HASHTAG = 5;
let errorMessage = '';

const buttonSubmitText = {
  IDLE: 'Опубликовать',
  SENDING: 'Опубликовываю...'
};

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
  { event: 'click', element: buttonClose, handler: closeForm},
  { event: 'keydown', element: document, handler: onKeydownEscFormHandler },
  { event: 'keydown', element: inputHashtags, handler: onKeydownEscFieldHandler },
  { event: 'keydown', element: description, handler: onKeydownEscFieldHandler }
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
  closeModal(overlay);
  removeEventListeners(handlers);
  form.reset();
  removeSliderEffects();
}

// Открытие формы
const openForm = () => {
  openModal(overlay);
  addEventListeners(handlers);
  addSliderEffects();
};

// Заблокировать кнопку отправки формы
const blockButtonSubmit = () => {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = buttonSubmitText.SENDING;
};

// Разблокировать кнопку отправки формы
const unblockButtonSubmit = () => {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = buttonSubmitText.IDLE;
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

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      blockButtonSubmit();
      const formData = new FormData(evt.target);
      sendData(formData)
        .then(onSuccess)
        .finally(unblockButtonSubmit);
    }
  });
};

setUserFormSubmit(closeForm);
