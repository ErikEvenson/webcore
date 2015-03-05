/**
 * Inspired by
 * https://gist.github.com/peter/9121297
 *
 * @param {String} protocol - Protocol string.
 * @param {String} hostname - The hostname the server is running on.
 * @param {String} url - The route.
 * @return {String} exports.redirectUrl - The redirected URL.
 */
var redirectUrl = exports.redirectUrl = function(protocol, hostname, url) {
  return protocol === 'https' ? null : ('https://' + hostname + url);
};

/**
 * @param {String} hostname - The hostname the server is running on.
 * @return {String} exports.force - Middleware function to handle the redirect.
 */
exports.force = function(hostname) {
  return function(req, res, next) {
    var redirectTo = redirectUrl(
      req.header('X-Forwarded-Proto'), hostname, req.url
    );

    if (redirectTo) {
      res.redirect(301, redirectTo);
    } else {
      next();
    }
  };
};
