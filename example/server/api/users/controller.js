/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

// 'use strict';

// var _ = require('lodash');
var Thing = require('../../models/users');

/**
 * A function to provide a JSON array of objects.
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 */
exports.index = function(req, res) {
  Thing.find()
    .sort('-date')
    .select('-password -salt')
    .exec(function(err, things) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(things);
    });
};

/**
 * A function to provide a JSON representation of an object.
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 */
exports.show = function(req, res) {
  Thing.findById(req.params.id)
    .select('-password -salt')
    .exec(function(err, thing) {
      if (err) { return handleError(res, err); }
      if (!thing) { return res.send(404); }
      return res.json(thing);
    });
};

/**
 * A function to create an object.
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 */
exports.create = function(req, res) {
  Thing.create(req.body, function(err, thing) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(thing);
  });
};

// // Updates an existing thing in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Thing.findById(req.params.id, function (err, thing) {
//     if (err) { return handleError(res, err); }
//     if(!thing) { return res.send(404); }
//     var updated = _.merge(thing, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.json(200, thing);
//     });
//   });
// };

// // Deletes a thing from the DB.
// exports.destroy = function(req, res) {
//   Thing.findById(req.params.id, function (err, thing) {
//     if(err) { return handleError(res, err); }
//     if(!thing) { return res.send(404); }
//     thing.remove(function(err) {
//       if(err) { return handleError(res, err); }
//       return res.send(204);
//     });
//   });
// };

function handleError(res, err) {
  return res.send(500, err);
}

