import Controller from '@ember/controller';
import { action } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';

export default class extends Controller {
  accessToken;
  authenticationError;

  @service
  session;

  @action
  async login() {
    try {
      await this.session.authenticate(
        'authenticator:github-access-token',
        this.accessToken
      );
    } catch ({ errors }) {
      if (errors.any(e => e.status === '401')) {
        this.setProperties({
          authenticationError: 'Incorrect access token provided'
        });
      } else {
        this.setProperties({ authenticationError: 'Authentication error' });
      }
    }
  }
}
