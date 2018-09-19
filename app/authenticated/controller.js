import Controller from '@ember/controller';
import { service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object';

export default class extends Controller {
  @service
  session;

  @action
  selectOrganization(selected) {
    this.setProperties({ selected: null });
    this.transitionToRoute(
      'authenticated.organizations.organization.repositories',
      selected.login
    );
  }

  @action
  async logout() {
    await this.session.invalidate();
  }
}
