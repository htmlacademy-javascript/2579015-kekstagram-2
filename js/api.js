import {showMessage} from './dom-utils.js';

const SERVER_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

// Получить данные с сервера
export const getData = () => fetch(
  SERVER_URL + Route.GET_DATA)
  .then((response) => response.json())
  .catch(() => showMessage('data-error'));

// Отправить данные на сервер
export const sendData = (formData) => fetch(
  SERVER_URL + Route.SEND_DATA,
  {
    method: 'POST',
    body: formData,
  },
).then((response) => {
  if (!response.ok) {
    throw new Error();
  }
  showMessage('success');
})
  .catch(() => {
    showMessage('error');
    throw new Error();
  });
