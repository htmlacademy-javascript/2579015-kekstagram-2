// Создание элемента разметки с заданным классом и заполненным текстом
function makeElement(tagName, className, text) {
  const newElement = document.createElement(tagName);
  newElement.classList.add(className);

  if(text) {
    newElement.textContent = text;
  }

  return newElement;
}

// Обработчик события нажатия Escape
function onKeydownEscHandler (evt, callback) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    callback();
  }
}

// Открытие модального окна
function openModal(element) {
  element.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

// Закрытие модального окна
function closeModal(element) {
  element.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

// Добавление событий
function addEventListeners(evt, handlersArray) {
  for (const item of handlersArray) {
    if (item.element && item.handler) {
      item.element.addEventListener(evt, item.handler);
    }
  }
}

// Удаление событий
function removeEventListeners(evt, handlersArray) {
  for (const item of handlersArray) {
    if (item.element && item.handler) {
      item.element.removeEventListener(evt, item.handler);
    }
  }
}

export {makeElement, onKeydownEscHandler, openModal, closeModal, addEventListeners, removeEventListeners};
