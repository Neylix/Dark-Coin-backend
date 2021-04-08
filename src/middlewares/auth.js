import jwt from 'jsonwebtoken';
import config from '../config.js';
import { getCompany } from '../controllers/companyController.js';

async function auth(req, res, next) {
  try {
    const { cookies, headers } = req;

    if (!cookies || !cookies.access_token) {
      return res.status(401).json({ error: 'Missing token in cookie'});
    }

    if (!headers || !headers['x-xsrf-token']) {
      return res.status(401).json({ error: 'Missing XSRF token in headers' });
    }

    const decodedToken = jwt.verify(cookies.access_token, config.jwt.secret);

    if (headers['x-xsrf-token'] !== decodedToken.xsrfToken) {
      return res.status(401).json({ error: 'Bad XSRF token' });
    }

    const companyId = Number(decodedToken.sub);

    if (! await getCompany(companyId)) return res.status(401).json({ error: 'L\'entreprise n\'existe pas' });

    req.companyId = companyId;
    req.role = decodedToken.role;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Requête non authentifiée'});
  }
}

export default auth;