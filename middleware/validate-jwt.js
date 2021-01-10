/**
 * @module middleware/validate-jwt
 */
const jwt = require('jsonwebtoken')
/**
 * Valida y envia el token por cabecera
 * @function validateJWT
 * @param {Request} req Peticion HTTP
 * @param {Response} res Respuesta HTTP
 * @param {Callback} next callback
 * @returns {Response} Si es true status 200 sino status 401
 */
const validateJWT = (req, res, next) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la petición'
    })
  }
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY)
    req.uid = uid
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido'
    })
  }
}

module.exports = { validateJWT }
