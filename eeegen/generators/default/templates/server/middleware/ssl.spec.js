var _ = require('lodash'),
  assert = require('assert'),
  sinon = require('sinon'),
  ssl = require('./ssl');

describe('middleware/ssl', function() {
  describe('redirectUrl', function() {
    it('returns an https url if protocol is http', function() {
      assert.equal(
        'https://api.naturkartan.se/some/url',
        ssl.redirectUrl('http', 'api.naturkartan.se', '/some/url')
      );
    });

    it('returns null if protocol is https', function() {
      assert.equal(
        null,
        ssl.redirectUrl('https', 'api.naturkartan.se', '/some/url')
      );
    });
  });

  describe('force', function() {
    it('calls next if request is secure', function() {
      var req = {
            header: sinon.stub()
              .withArgs('X-Forwarded-Proto').returns('https')
          },
          res = {},
          next = sinon.mock().once();

      ssl.force('api.naturkartan.se')(req, res, next);

      next.verify();
    });

    it('redirects to https if request is not secure', function() {
      var req = {
            url: '/foobar', header: sinon.stub()
              .withArgs('X-Forwarded-Proto').returns('http')
          },
          res = {
            redirect: sinon.mock()
              .withArgs(301, 'https://api.naturkartan.se/foobar').once()
          },
          next = {};

      ssl.force('api.naturkartan.se')(req, res, next);

      res.redirect.verify();
    });
  });
});
