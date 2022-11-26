const express = require('express')
const UserController = require('../Controllers/User')
const router = express.Router();

router.get('/', UserController.findAll);
router.get('/:id', UserController.findOne);
router.get('/', UserController.create);
router.get('/:id', UserController.update);
router.get('/:id', UserController.destroy);

module.exports = router