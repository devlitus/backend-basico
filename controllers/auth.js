const { response } = require("express");
const bycript = require('bcryptjs');
const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");
const user = require("../models/user");

const createUser = async(req, res = response) => {

  const { email, password } = req.body;
  try {
    const isEmail = await User.findOne({ email: email });

    if (isEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya éxiste'
      })
    }
     
    const user = new User(req.body);
    const salt = bycript.genSaltSync();
    user.password = bycript.hashSync(password, salt);
    await user.save();

    const token = await generateJWT(user.id);
    res.json({
      ok: true,
      msg: 'Crear usuario',
      user,
      token
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Habla con el administrador'
    })
  }
}

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const userDB = await user.findOne({ email });
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Email no encontrado',
      })
    }

    const validPassword = bycript.compareSync(password, userDB.password);
    if (!validPassword) {

      return res.status(400).json({
        ok: false,
        msg: 'Contraseña no es valida',
      })
    }

    const token = await generateJWT(userDB.id);
    res.json({
      ok: true,
      user: userDB,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Habla con el administrador'
    })
  }
}

const renewToken = async (req, res = response) => {
  const uid = req.uid
  const token = await generateJWT(uid);
  const user = await User.findById(uid);
  res.json({
    ok: true,
    user,
    token
  });
}
module.exports = { createUser, login, renewToken };