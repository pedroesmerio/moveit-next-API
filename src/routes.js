const express = require('express');
const router = express.Router();

//IMPORT MIDDLEWARES
const Auth = require('./middlewares/Auth');

//IMPORT VALIDATORS
const AuthValidator = require('./validators/AuthValidator');
const UserValidator = require('./validators/UserValidator');

//IMPORT CONTROLLERS
const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');

router.get('/ping', (req, res) => {
  res.json({ pong: true });
});

router.get('/states', Auth.private, UserController.getStates);

router.post('/user/signin', AuthValidator.signin, AuthController.signin);
router.post('/user/signup', AuthValidator.signup, AuthController.signup);

router.get('/user/me', Auth.private, UserController.info);
router.put(
  '/user/me',
  UserValidator.editAction,
  Auth.private,
  UserController.editAction
);

module.exports = router;
