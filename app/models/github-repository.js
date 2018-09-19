import { computed } from '@ember-decorators/object';
import GithubRepositoryModel from 'ember-data-github/models/github-repository';

export default class extends GithubRepositoryModel {
  @computed
  get branchesList() {
    return this.store.query('github-branch', { repo: this.id });
  }
}
