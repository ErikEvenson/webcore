# /**
#  * Using Rails-like standard naming convention for endpoints.
#  * GET     /customers              ->  index
#  * POST    /customers              ->  create
#  * GET     /customers/:id          ->  show
#  * PUT     /customers/:id          ->  update
#  * DELETE  /customers/:id          ->  destroy
#  */

_ = require 'lodash'
Customer = require './customer.model'

# Get list of things
exports.index = (req, res) ->
  Customer.find (err, customers) ->
    if err
      return handleError(res, err)
      
    return res.json 200, customers

# exports.index = function(req, res) {
#   Thing.find(function (err, things) {
#     if(err) { return handleError(res, err); }
#     return res.json(200, things);
#   });
# };

# // Get a single thing
# exports.show = function(req, res) {
#   Thing.findById(req.params.id, function (err, thing) {
#     if(err) { return handleError(res, err); }
#     if(!thing) { return res.send(404); }
#     return res.json(thing);
#   });
# };

# // Creates a new thing in the DB.
# exports.create = function(req, res) {
#   Thing.create(req.body, function(err, thing) {
#     if(err) { return handleError(res, err); }
#     return res.json(201, thing);
#   });
# };

# // Updates an existing thing in the DB.
# exports.update = function(req, res) {
#   if(req.body._id) { delete req.body._id; }
#   Thing.findById(req.params.id, function (err, thing) {
#     if (err) { return handleError(res, err); }
#     if(!thing) { return res.send(404); }
#     var updated = _.merge(thing, req.body);
#     updated.save(function (err) {
#       if (err) { return handleError(res, err); }
#       return res.json(200, thing);
#     });
#   });
# };

# // Deletes a thing from the DB.
# exports.destroy = function(req, res) {
#   Thing.findById(req.params.id, function (err, thing) {
#     if(err) { return handleError(res, err); }
#     if(!thing) { return res.send(404); }
#     thing.remove(function(err) {
#       if(err) { return handleError(res, err); }
#       return res.send(204);
#     });
#   });
# };

handleError = (res, err) ->
  return res.send 500, err

# function handleError(res, err) {
#   return res.send(500, err);
# }