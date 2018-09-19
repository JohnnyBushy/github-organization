import { module, test } from 'qunit';
import { currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import organizationPage from 'github-organization/tests/pages/organization';
import login from 'github-organization/tests/pages/login';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | organization repositories', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    const organization = server.create('github-organization', {
      login: 'github',
      name: 'GitHub',
      avatar_url: 'https://placehold.it/150x150',
      html_url: 'https://github.com/github',
      public_repos: 25
    });

    server.createList('github-repository', 25, {
      language: 'Javascript',
      private: false,
      owner: organization
    }, 'withBranches');
  });

  test('User can open organization page', async function(assert) {
    await login.loginSuccessfully();

    await organizationPage.visit({ organization: 'github' });

    assert.equal(currentURL(), '/orgs/github/repositories');

    assert.equal(organizationPage.repositories.length, 10);
    assert.equal(organizationPage.name, 'GitHub');
    assert.equal(organizationPage.image, 'https://placehold.it/150x150');
    assert.equal(organizationPage.link, 'https://github.com/github');
  });
});
