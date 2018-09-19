import GithubOrganizationAdapter from 'ember-data-github/adapters/github-organization';

export default GithubOrganizationAdapter.extend({
  shouldBackgroundReloadRecord() {
    return false;
  }
})
