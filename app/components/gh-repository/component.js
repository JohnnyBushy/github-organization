import Component from '@ember/component';

export default class extends Component {
  classNames = ['ui', 'item'];
  isExpanded = false;

  click() {
    this.set('isExpanded', !this.isExpanded);
  }
}
