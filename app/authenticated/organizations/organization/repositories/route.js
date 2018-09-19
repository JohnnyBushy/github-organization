import Route from '@ember/routing/route';
import { hash, all } from 'rsvp';

const LENGTH = 30;

export default class extends Route {
  model() {
    const { organization } = this.modelFor(
      'authenticated.organizations.organization'
    );
    const pages = organization.publicRepos / LENGTH;
    const repositoryPromises = [];
    let page = 1;

    do {
      repositoryPromises.push(
        this.store.query('github-repository', {
          org: organization.id,
          per_page: LENGTH,
          page: page
        })
      );
      page += 1;
    } while (page <= pages);

    return hash({
      organization: organization,
      repositories: all(repositoryPromises).then(repos =>
        repos.reduce((left, right) => {
          left.addObjects(right);
          return left;
        }, [])
      )
    });
  }
}
