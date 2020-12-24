const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
  jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: '12h'
  }, (err, token) => {
      if (err) {
        reject('NO se puede generar el JWT');
      } else {
        resolve(token);
      }
  });
  })
}

const checkedJWT =(token = '') => {
  try {
    const {uid} = jwt.verify(token, process.env.JWT_KEY);

    return [true, uid];
  } catch (error) {
    return [false, null];
  }
}
module.exports = {generateJWT, checkedJWT}