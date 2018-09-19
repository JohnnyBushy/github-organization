import {
  create,
  // clickable,
  visitable,
  text,
  attribute,
  collection
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/orgs/:organization/repositories'),

  name: text('[data-test-organization-name]'),
  image: attribute('src', '[data-test-organization-image]'),
  link: attribute('href', '[data-test-organization-link]'),

  repositories: collection('[data-test-organization-repository]')
});
