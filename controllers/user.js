/**
 * Controla los usuario conectados
 * @module controllers/user
 */
const { response } = require('express')
const User = require('../models/user')
/**
 * Obtener los usuarios conectados
 * @async
 * @function getUsers
 * @param {Request} req Petición HTTP
 * @param {Response} res Respuesta HTTP
 * @returns {Response} Respuesta de typo json
 */
const getUsers = async (req, res = response) => {
  const users = await User.find({ _id: { $ne: req.uid } }).sort('-online')
  res.json({
    ok: true,
    users
  })
}

module.exports = { getUsers }
