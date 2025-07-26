const MESSAGE_SHOW_TIME = 5000;

// Создание элемента разметки с заданным классом и заполненным текстом
export function makeElement(tagName, className, text) {
  const newElement = document.createElement(tagName);
  newElement.classList.add(className);

  if(text) {
    newElement.textContent = text;
  }

  return newElement;
}

// Обработчик события нажатия Escape
export function onKeydownEscHandler (evt, callback) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    callback();
  }
}

// Обработчик клика вне элемента
function onClickDocumentOutside(evt, element, callback) {
  if (element && !element.contains(evt.target)) {
    callback();
  }
}

// Открытие модального окна
export function openModal(element) {
  element.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

// Закрытие модального окна
export function closeModal(element) {
  element.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

// Добавление событий
export function addEventListeners(handlersArray) {
  for (const item of handlersArray) {
    if (item.event && item.element && item.handler) {
      item.element.addEventListener(item.event, item.handler);
    }
  }
}

// Удаление событий
export function removeEventListeners(handlersArray) {
  for (const item of handlersArray) {
    if (item.event && item.element && item.handler) {
      item.element.removeEventListener(item.event, item.handler);
    }
  }
}

// Повесить обработчики для закрытия элемента
function onClickCloseHandlers(element, button) {
  const handlers = [
    { event: 'click', element: button, handler: removeElement},
    { event: 'click', element: document, handler: onClickDocument},
    { event: 'keydown', element: document, handler: onKeydownEsc}
  ];

  function removeElement() {
    element.parentElement.remove();
    removeEventListeners(handlers);
  }

  function onClickDocument(evt) {
    onClickDocumentOutside(evt, element, removeElement);
  }

  function onKeydownEsc(evt) {
    onKeydownEscHandler(evt, removeElement);
  }

  addEventListeners(handlers);
}

// Создание слайдера
export function createSlider(sliderElement, minValue, maxValue, stepValue) {
  noUiSlider.create(sliderElement, {
    range: {
      min: minValue,
      max: maxValue,
    },
    step: stepValue,
    start: minValue,
    connect: 'lower'
  });
}

// Обновить слайдер
export function updateOptionsSlider(slider, minValue, maxValue, stepValue) {
  slider.noUiSlider.updateOptions({
    range: {
      min: minValue,
      max: maxValue,
    },
    step: stepValue,
    start: minValue
  });
}

// Показать сообщение по шаблону
export function showMessage(templateId) {
  const template = document.getElementById(templateId);
  const message = template.content.querySelector('section').cloneNode(true);
  const inner = message.querySelector(`.${ templateId }__inner`);
  const button = message.querySelector(`.${ templateId }__button`);

  document.body.append(message);

  if (button) {
    onClickCloseHandlers(inner, button);
  } else {
    setTimeout(() => {
      message.remove();
    }, MESSAGE_SHOW_TIME);
  }
}

