import {getData} from './api.js';
import {renderPosts} from './render-pictures.js';
import {showFilters} from './filters.js';
import './valid-form.js';
import './effects.js';

getData()
  .then(renderPosts)
  .then(showFilters);
