import jwt from 'jsonwebtoken';
import config from '../config.js';
import { getCompany } from '../controllers/companyController.js';

async function auth(req, res, next) {
  try {
    const { cookies, headers } = req;

    if (!cookies || !cookies.access_token) {
      return res.status(401).json({ error: 'Missing token in cookie'});
    }

    const token = cookies.access_token;

    if (!headers || !headers['x-xsrf-token']) {
      return res.status(401).json({
        error: 'Missing XSRF token in headers'
      });
    }

    const xsrfToken = headers['x-xsrf-token'];

    const decodedToken = jwt.verify(token, config.jwt.secret);

    if (xsrfToken !== decodedToken.xsrfToken) {
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