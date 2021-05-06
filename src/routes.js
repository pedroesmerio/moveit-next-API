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
const RankController = require('./controllers/RankController');

router.get('/ranking', RankController.getRank);

//Loga no sistema
router.post('/user/signin', AuthValidator.signin, AuthController.signin);
//Faz Cadastro
router.post('/user/signup', AuthValidator.signup, AuthController.signup);

//Pega informações do user
router.get('/user/me', Auth.private, UserController.info);

//Altera informações do user
router.put(
  '/user/me',
  UserValidator.editAction,
  Auth.private,
  UserController.editAction
);

module.exports = router;
