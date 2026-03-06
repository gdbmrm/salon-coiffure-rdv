const jwt = require('jsonwebtoken');
const SECRET = "ton_secret_ici";

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: "Token manquant" });

  const token = authHeader.split(' ')[1];
  try {
    const user = jwt.verify(token, SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ message: "Token invalide" });
  }
}

module.exports = authMiddleware;