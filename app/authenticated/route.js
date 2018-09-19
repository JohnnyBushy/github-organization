import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { service } from '@ember-decorators/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default class extends Route.extend(AuthenticatedRouteMixin) {
  @service session;

  model() {
    return hash({
      userAvatarUrl: this.session.data.authenticated.avatarUrl,
      userName: this.session.data.authenticated.name
    })
  }
}
