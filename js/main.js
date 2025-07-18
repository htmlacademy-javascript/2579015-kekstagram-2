import {getInputData} from './data.js';
import {createPosts} from './posts.js';
import {renderPosts} from './render-pictures.js';
import './valid-form.js';

const {DESCRIPTIONS, MESSAGES, NAMES} = getInputData();

const INPUT_DATA = {
  DESCRIPTIONS: DESCRIPTIONS,
  MESSAGES: MESSAGES,
  NAMES: NAMES
};

const posts = createPosts(INPUT_DATA);
renderPosts(posts);
