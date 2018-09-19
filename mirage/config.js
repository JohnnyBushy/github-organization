export default function() {}

export function testConfig() {
  this.urlPrefix = 'https://api.github.com';
  this.namespace = '';

  const authenticatedUser = this.create('github-user', {
    id: '#',
    name: 'Bruce',
    login: 'current',
    avatar_url: 'https://placehold.it/50x50',
    repos_url: ''
  });

  this.get('/user', authenticatedUser.toJSON());

  this.get('/orgs/:login', ({ githubOrganizations }, request) => {
    const login = request.params.login;

    return githubOrganizations.findBy({ login }).toJSON();
  });

  this.get(
    '/orgs/:organization/repos',
    ({ githubRepositories }, { queryParams: { page, per_page } }) => {
      return githubRepositories
        .all()
        .models.slice((page - 1) * per_page, page * per_page)
        .map(repo => repo.toJSON());
    }
  );

  this.get(
    '/repos/:user/:repository/branches',
    ({ githubRepositories }, request) => {
      const repository = request.params.repository;

      return githubRepositories.findBy({ name: repository }).branches;
    }
  );
}
