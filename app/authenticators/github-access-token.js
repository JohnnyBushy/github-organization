import BaseAuthenticator from 'ember-simple-auth/authenticators/base';
import { service } from '@ember-decorators/service';

export default class extends BaseAuthenticator {
  @service
  githubSession;

  @service
  store;

  async restore(data) {
    this.githubSession.set('githubAccessToken', data.accessToken);

    return data;
  }

  async authenticate(accessToken) {
    this.githubSession.set('githubAccessToken', accessToken);

    const user = await this.store.findRecord('github-user', '#');

    return Object.assign({}, user.toJSON(), { accessToken });
  }

  async invalidate() {
    this.githubSession.set('githubAccessToken', null);
    return {};
  }
}
