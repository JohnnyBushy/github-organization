import GithubAdapter from 'ember-data-github/adapters/github';

export default GithubAdapter.extend({
  shouldBackgroundReloadRecord() {
    return false;
  },

  urlForQuery(query) {
    let builtURL = this._super(...arguments);
    let { org } = query;

    delete query.org;

    return builtURL.replace('repositories', `orgs/${org}/repos`);
  }
});
