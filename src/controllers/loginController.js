import { userLogin } from '../controllers/userController.js';
import { companyLogin } from '../controllers/companyController.js';
import roles from '../models/roles.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import crypto from 'crypto';

export async function login(req, res) {
  try {
    const { mail, username, password } = req.body;

    if (!username && !mail) return res.status(400).json({ error: 'Missing identifier parameter'});

    if (!password) return res.status(400).json({ error: 'Missing password parameter'});

    let companyId;
    let role;

    if (username) {
      companyId = await userLogin(req, res).catch(() => { return });
      role = roles.USER;
    } else {
      companyId = await companyLogin(req, res).catch(() => { return });
      role = roles.COMPANY;
    }

    // If auth is correct, companyId is valued in req
    if (companyId) {

      // CSRF token
      const xsrfToken = crypto.randomBytes(64).toString('hex');

      // JWT with csrf in payload
      const token = jwt.sign(
        { role, xsrfToken },
        config.jwt.secret,
        {
          expiresIn: config.jwt.expireIn / 1000, // have to be in seconds
          subject: companyId.toString()
        }
      );

      // Create cookie with JWT
      res.cookie('access_token', token, {
        sameSite: 'Strict',
        httpOnly: true,
        maxAge: config.jwt.expireIn
      });
  
      res.status(200).json({
        companyId: companyId,
        xsrfToken: xsrfToken
      });
    }

  } catch (error) {
    const err = error.toString();
    //console.log(error);
    res.status(500).json({ error: err });
  }
}
