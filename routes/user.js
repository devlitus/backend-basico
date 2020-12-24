/* 
    PATH: api/users
 */
const { Router } = require('express');
const { getUsers } = require('../controllers/user');
const router = Router();
const { validateJWT } = require('../middleware/validate-jwt');


router.get('/', validateJWT, getUsers);

module.exports = router;