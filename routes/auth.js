/* 
    PATH: api/login
 */
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { createUser, login, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middleware/validate-fields');
const { validateJWT } = require('../middleware/validate-jwt');

router.post('/', [
  check('email', 'el email es obligatorio').isEmail(),
  check('password', 'la contraseña es obligatorio').not().isEmpty(),
  validateFields
], login);

router.post('/new', [
  check('name', 'el nombre es obligatorio').not().isEmpty(),
  check('email', 'el email es obligatorio').isEmail(),
  check('password', 'la contraseña es obligatorio').not().isEmpty(),
  validateFields
], createUser);

router.get('/renew', validateJWT ,renewToken);

module.exports = router;