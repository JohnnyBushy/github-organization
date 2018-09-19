import {
  create,
  clickable,
  fillable,
  text,
  attribute,
  collection
} from 'ember-cli-page-object';

export default create({
  search: fillable('[data-test-search-input] input'),
  searchResults: collection('[data-test-search-results] a.result', {
    name: text('.title'),
    image: attribute('src', '.image img')
  }),
  selectFirstResult: clickable('[data-test-search-results] a.result', {
    at: 0
  }),

  userName: text('[data-test-user-name]'),
  userImage: attribute('src', '[data-test-user-image]'),

  logout: clickable('[data-test-logout-link]')
});
