import { module, test } from 'qunit';
import { currentURL, waitUntil } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import topbar from 'github-organization/tests/pages/topbar';
import login from 'github-organization/tests/pages/login';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | search organization', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    const organizations = server.createList('github-organization', 5, {
      avatar_url: 'https://placehold.it/50x50'
    });
    server.get('/search/users', () => {
      return {
        items: organizations.map(org => org.toJSON())
      };
    });

    server.get('/orgs/:login', ({ githubOrganizations }, request) => {
      const login = request.params.login;

      return githubOrganizations.findBy({ login }).toJSON();
    });

    server.get('/orgs/:organization/repos', () => {
      return [];
    });
  });

  test('User can find organization and transition to its page', async function(assert) {
    await login.loginSuccessfully();
    assert.equal(currentURL(), '/orgs');

    await topbar.search('github');

    await waitUntil(() => topbar.searchResults.length === 5, { timeout: 2000 });

    assert.equal(topbar.searchResults.objectAt(0).name, 'Organization 0');
    assert.equal(
      topbar.searchResults.objectAt(0).image,
      'https://placehold.it/50x50'
    );

    await topbar.selectFirstResult();
    assert.equal(currentURL(), '/orgs/organization0/repositories');
  });
});
