/* 
    PATH: api/message
 */
const { Router } = require('express');
const { getMessage } = require('../controllers/message');
const { validateJWT } = require('../middleware/validate-jwt');
const router = Router();



router.get('/:de', validateJWT, getMessage)
module.exports = router;