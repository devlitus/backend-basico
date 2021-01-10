/**
 * controla la conección por socket
 * @module controllers/socket
 */
const User = require('../models/user')
const Message = require('../models/message')
/**
 * Conectar a un usuario al socket
 * @async
 * @function userConnected
 * @param {string} uid uid del usuario
 * @returns {User}
 */
const userConnected = async (uid = '') => {
  const user = await User.findById(uid)
  user.online = true
  await user.save()
  return user
}
/**
 * Desconecta a un usuario al socket
 * @async
 * @function userDisconnected
 * @param {string} uid uid del usuario
 * @returns {User}
 */
const userDisconnected = async (uid = '') => {
  const user = await User.findById(uid)
  user.online = false
  await user.save()
  return user
}
/**
 * Almacena los mensajes
 * @async
 * @function saveMessage
 * @param {Object} payload El cuerpo del mensaje
 * @returns {boolean}
 */

const saveMessage = async (payload) => {
  try {
    const message = new Message(payload)
    await message.save()
    return true
  } catch (error) {
    return false
  }
}
module.exports = { userConnected, userDisconnected, saveMessage }
