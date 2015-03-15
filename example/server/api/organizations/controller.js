/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

var _ = require('lodash');
var Thing = require('../../models/organizations');

/**
 * A function to create an object.
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 */
exports.create = function(req, res) {
  var thing = new Thing(req.body);
  thing.creator = req.user;

  thing.save(function(err, thing) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(thing);
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  var thing = req.thing;

  thing.remove(function(err) {
      if (err) { return handleError(res, err); }
      return res.send(204);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

exports.hasAuthorization = function(req, res, next) {
  if (req.thing.creator.id !== req.user.id) {
    return res.status(403).send({
      message: 'User is not authorized'
    });
  }

  next();
};

/**
 * A function to provide a JSON array of objects.
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 */
exports.index = function(req, res) {
  Thing.find()
    .sort('-created')
    .populate('creator', 'name email')
    .exec(function(err, things) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(things);
    });
};

exports.requiresLogin = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).send({
      message: 'User is not logged in'
    });
  }

  next();
};

/**
 * A function to provide a JSON representation of an object.
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 */
exports.show = function(req, res) {
  return res.json(req.thing);
};

exports.thingByID = function(req, res, next, id) {
  Thing.findById(id)
    .populate('creator', 'name email')
    .exec(function(err, thing) {
      if (err) { return handleError(res, err); }
      if (!thing) { return res.send(404); }
      req.thing = thing;
      next();
  });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
  if (req.body._id) { delete req.body._id; }
  var thing = req.thing;
  var updated = _.merge(thing, req.body);

  updated.save(function(err) {
    if (err) { return handleError(res, err); }
    return res.json(200, thing);
  });
};
