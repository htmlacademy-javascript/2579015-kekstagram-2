import {getData} from './api.js';
// import {createPosts} from './posts.js';
import {renderPosts} from './render-pictures.js';
import './valid-form.js';
import './effects.js';

// const {DESCRIPTIONS, MESSAGES, NAMES} = getInputData();

// const INPUT_DATA = {
//   DESCRIPTIONS: DESCRIPTIONS,
//   MESSAGES: MESSAGES,
//   NAMES: NAMES
// };

// const posts = createPosts(INPUT_DATA);
// (posts);

// fetch('https://31.javascript.htmlacademy.pro/kekstagra/data')
//   .then((response) => response.json())
//   .then()
//   .catch(() => console.log('Error'));


getData()
  .then(renderPosts);
