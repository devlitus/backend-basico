/**
 * @module middleware/validate-fields
 */
const { response } = require('express')
const { validationResult } = require('express-validator')
/**
 * Valida los campos de un formulario
 * @function validateFields
 * @param {Request} req Petición HTTP
 * @param {Response} res Respuesta HTTP
 * @param {Callback} next callback
 * @returns {Response} Si los campos son correcto status 200 sino status 400
 */
const validateFields = (req, res = response, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped()
    })
  }
  next()
}

module.exports = { validateFields }
