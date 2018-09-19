import {
  create,
  clickable,
  fillable,
  text,
  visitable,
  isVisible
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/'),

  token: fillable('[data-test-login-input]'),
  submit: clickable('[data-test-login-submit]'),
  error: text('[data-test-login-error]'),
  loginErrorIsVisible: isVisible('[data-test-login-error]'),

  loginSuccessfully() {
    return this.visit()
      .token('valid-access-token')
      .submit();
  }
});
