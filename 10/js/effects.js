import {addEventListeners, createSlider, updateOptionsSlider} from './dom-utils.js';

const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const inputScale = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const inputEffectLevel = document.querySelector('.effect-level__value');
const effectsList = document.querySelectorAll('input[name="effect"]');
const STEP_SCALE = 25;
const MAX_VALUE_SCALE = 100;
const MIN_VALUE_SCALE = 25;

const clickHandlers = [
  { element: buttonSmaller, handler: () => addInputScale(-STEP_SCALE)},
  { element: buttonBigger, handler: () => addInputScale(STEP_SCALE) }
];

const effects = {
  none : () => 'none',
  chrome : (value) => `grayscale(${value})`,
  sepia : (value) => `sepia(${value})`,
  marvin : (value) => `invert(${value}%)`,
  phobos : (value) => `blur(${value}px)`,
  heat : (value) => `brightness(${value})`
};

const effectsConfig = {
  none: { min: null, max: null },
  chrome: { min: 0, max: 1, step: 0.1 },
  sepia: { min: 0, max: 1, step: 0.1 },
  marvin: { min: 0, max: 100, step: 1 },
  phobos: { min: 0, max: 3, step: 0.1 },
  heat: { min: 1, max: 3, step: 0.1 }
};

// Добавить к масштабу заданное значение
function addInputScale(step) {
  const currentScale = Number(inputScale.value.replace('%', ''));
  const newScale = currentScale + step;

  if (newScale >= MIN_VALUE_SCALE && newScale <= MAX_VALUE_SCALE) {
    inputScale.value = `${newScale}%`;
    imagePreview.style.transform = `scale(${newScale / 100})`;
  }
}

// Скрыть слайдер и сбросить эффект
function resetEffects() {
  slider.classList.add('hidden');
  sliderContainer.classList.add('hidden');
  imagePreview.style.filter = 'none';
}

// Получить выбранный эфект
function getCheckedEffect() {
  return Array.from(effectsList).find((radio) => radio.checked);
}

// Добавить обработчики для кнопок scale
addEventListeners('click', clickHandlers);

// Создаем слайдер
createSlider(slider, 0, 1, 0.1);

// Обработчик изменения слайдера
slider.noUiSlider.on('update', () => {
  inputEffectLevel.value = slider.noUiSlider.get();
  const checkedEffect = getCheckedEffect().value;
  const effectFunc = effects[checkedEffect];
  imagePreview.style.filter = effectFunc(inputEffectLevel.value);
});

// Обработчик если эффект выбран
effectsList.forEach((radio) => {
  radio.addEventListener('change', () => {
    const effect = radio.value;
    const config = effectsConfig[effect];

    if (effect === 'none') {
      resetEffects();
    } else {
      updateOptionsSlider(slider, config.min, config.max, config.step);
    }
  });
});
