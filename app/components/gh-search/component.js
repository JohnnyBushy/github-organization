import Component from '@ember/component';
import { service } from '@ember-decorators/service';
import { didCancel } from 'ember-concurrency';

export default class extends Component {
  @service
  githubSearch;

  get apiSettings() {
    const githubSearch = this.githubSearch;
    return {
      responseAsync(settings, callback) {
        githubSearch.searchOrganizations
          .perform(settings.urlData.query)
          .catch((e) => {
            if (!didCancel(e)) {
              // re-throw the non-cancelation error
              throw e;
            }
          })
          .then(organizations => callback({ results: organizations }));
      }
    };
  }
}
