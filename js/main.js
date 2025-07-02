import {getInputData} from './data.js';

import {createPosts} from './posts.js';

const {DESCRIPTIONS, MESSAGES, NAMES} = getInputData();

const INPUT_DATA = {
  DESCRIPTIONS: DESCRIPTIONS,
  MESSAGES: MESSAGES,
  NAMES: NAMES
};

createPosts(INPUT_DATA);
