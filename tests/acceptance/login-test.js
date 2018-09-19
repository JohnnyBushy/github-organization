import { module, test } from 'qunit';
import { currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import loginPage from 'github-organization/tests/pages/login';
import topbar from 'github-organization/tests/pages/topbar';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | login', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /login', async function(assert) {
    await loginPage.visit();

    assert.equal(currentURL(), '/login');
  });

  test('user can authenticate', async function(assert) {
    await loginPage
      .visit()
      .token('accesstoken')
      .submit();

    assert.equal(currentURL(), '/orgs');

    const user = server.db.githubUsers.find('#');

    assert.equal(topbar.userName, user.name);
    assert.equal(topbar.userImage, user.avatar_url);
  });


  test('authentication error message is shown', async function(assert) {
    server.get('/user', {}, 401);

    await loginPage
      .visit()
      .token('accesstoken')
      .submit();

    assert.equal(currentURL(), '/login');
    assert.ok(loginPage.loginErrorIsVisible);
  });
});
