import Controller from '@ember/controller';
import { service } from '@ember-decorators/service';
import { readOnly } from '@ember-decorators/object/computed';

export default class extends Controller {
  @service
  session;

  @readOnly('model.organization')
  organization;
}
