var redirectUrl = exports.redirectUrl = function(protocol, hostname, url) {
  return protocol === 'https' ? null : ('https://' + hostname + url);
};

exports.force = function(hostname) {
  return function(req, res, next) {
    var redirectTo = redirectUrl(req.header('X-Forwarded-Proto'), hostname, req.url);
    if (redirectTo) {
      res.redirect(301, redirectTo);
    } else {
      next();
    }
  };
};