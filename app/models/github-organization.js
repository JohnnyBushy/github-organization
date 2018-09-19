import { attr } from '@ember-decorators/data';
import GithubOrganizationModel from 'ember-data-github/models/github-organization';

export default class extends GithubOrganizationModel {
  @attr('string') htmlUrl;
  @attr('string') publicRepos;
}
