import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model({ organization_id }) {
    return hash({
      organization: this.store.findRecord(
        'github-organization',
        organization_id
      )
    });
  }
});
