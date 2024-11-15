const jwt = require('jsonwebtoken');

const auth = (roles = []) => {
  return (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) return res.status(401).send('Access denied.');

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Role-based access control
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).send('Forbidden');
      }
      
      next();
    } catch (error) {
      res.status(400).send('Invalid token');
    }
  };
};

module.exports = auth;