const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {


  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ msg: 'No hay token, permiso denegado' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token no válido' });
  }
};

module.exports = auth;
