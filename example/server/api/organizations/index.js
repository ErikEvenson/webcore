var express = require('express');
var controller = require('./controller');

var router = express.Router();

router.get('/', controller.requiresLogin, controller.index);

router.get('/:id',
  controller.requiresLogin,
  controller.hasAuthorization,
  controller.show
);

router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

router.param('id', controller.thingByID);

/** @param {Object} module.exports - Export the router. */
module.exports = router;
