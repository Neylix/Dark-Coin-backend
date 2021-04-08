function authorization(allowedRoles = []) {
  if (typeof allowedRoles === 'string') {
    allowedRoles = [allowedRoles];
  }

  return (req, res, next) => {

    if (!req.role || (allowedRoles.length && !allowedRoles.includes(req.role))) {
      return res.status(403).json({ error: 'Unauthorized'});
    }

    next();
  };
}

export default authorization;