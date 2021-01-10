/**
 * Controla los mensajes
 * @module controllers/message
 */
const { response } = require('express')
const Message = require('../models/message')
/**
 * Obtener los mensajes entre usuarios
 * @async
 * @function getMessage
 * @param {Request} req Petición HTTP
 * @param {Response} res Respuesta HTTP
 * @returns {Response} Response de tipo json
 */
const getMessage = async (req, res = response) => {
  const myUid = req.uid
  const messageDe = req.params.de

  const last30 = await Message.find({
    $or: [{ de: myUid, para: messageDe }, { de: messageDe, para: myUid }]
  })
    .sort({ createdAt: 'desc' })
    .limit(30)
  res.json({
    ok: true,
    message: last30
  })
}

module.exports = { getMessage }
