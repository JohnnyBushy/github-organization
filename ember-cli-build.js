'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'mirage-support': {
      includeAll: true
    }
  });

  return app.toTree();
};
