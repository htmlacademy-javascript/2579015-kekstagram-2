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
export function addEventListeners(evt, handlersArray) {
  for (const item of handlersArray) {
    if (item.element && item.handler) {
      item.element.addEventListener(evt, item.handler);
    }
  }
}

// Удаление событий
export function removeEventListeners(evt, handlersArray) {
  for (const item of handlersArray) {
    if (item.element && item.handler) {
      item.element.removeEventListener(evt, item.handler);
    }
  }
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
