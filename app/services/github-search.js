import Service from '@ember/service';
import { all } from 'rsvp';
import { service } from '@ember-decorators/service';
import { restartableTask } from 'ember-concurrency-decorators';
import { timeout } from 'ember-concurrency';

const GITHUB_API_HOST = 'https://api.github.com';

export default class extends Service {
  @service
  store;

  @service
  ajax;

  @restartableTask
  searchOrganizations = function*(query) {
    yield timeout(250);
    const { items } = yield this.ajax.request(
      `${GITHUB_API_HOST}/search/users`,
      {
        method: 'GET',
        processData: false,
        data: `q=${query}+in:name+type:org&per_page=5`
      }
    );

    // load full info about organization to
    const organizations = yield all(
      items.map(org => {
        return this.store.findRecord('github-organization', org.login);
      })
    );

    return organizations.map(organization => {
      return {
        image: organization.avatarUrl,
        title: organization.name,
        login: organization.login,
        id: organization.id
      };
    });
  };
}
