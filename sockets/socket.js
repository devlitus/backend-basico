const { checkedJWT } = require('../helpers/jwt')
const { io } = require('../index')
const { userConnected, userDisconnected, saveMessage } = require('../controllers/socket')
// Mensajes de Sockets
io.on('connection', client => {
  console.log('Cliente conectado')
  const [validated, uid] = checkedJWT(client.handshake.headers['x-token'])

  if (!validated) { return client.disconnect() }
  // Cliente conectado
  userConnected(uid)

  // Ingresar a una sala o canal en particular
  client.join(uid)

  // Escuchar mensaje-personal
  client.on('message-personal', async (payload) => {
    await saveMessage(payload)
    io.to(payload.para).emit('message-personal', payload)
  })

  client.on('disconnect', () => {
    console.log('Cliente desconectado')
    userDisconnected(uid)
  })
})
