import Controller from '@ember/controller';
import { readOnly } from '@ember-decorators/object/computed';
import { action, computed } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';
import { isEmpty } from '@ember/utils';

export default class extends Controller {
  queryParams = ['page', 'language'];
  page = 1;
  language = null;

  @service
  githubLanguages;

  @readOnly('model.organization')
  organization;

  @readOnly('model.repositories')
  repositories;

  @computed('repositories', 'language')
  get filteredRepositories() {
    return isEmpty(this.language)
      ? this.repositories
      : this.repositories.filterBy('language', this.language);
  }

  @computed('page', 'filteredRepositories')
  get repositoriesOnPage() {
    return this.filteredRepositories.slice((this.page - 1) * 10, this.page * 10);
  }

  @computed('filteredRepositories')
  get isPaginationEnabled() {
    return this.filteredRepositories.length > 10;
  }

  @computed('page', 'filteredRepositories')
  get hasNext() {
    return this.page * 10 < this.filteredRepositories.length;
  }

  @computed('page')
  get hasPrevious() {
    return this.page !== 1;
  }

  @action
  selectLanguage(language) {
    this.set('page', 1);
    this.set('language', language);
  }

  @action
  nextPage() {
    this.set('page', this.page + 1);
  }

  @action
  previousPage() {
    this.set('page', this.page - 1);
  }
}
