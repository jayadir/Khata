const jwtService = require('../services/jwt');
exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.accessTkn;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const response = await jwtService.verifyToken(token);
    if (!response) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = response;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};