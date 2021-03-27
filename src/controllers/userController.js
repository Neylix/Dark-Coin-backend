import db from './db.js';
import bcrypt from 'bcrypt';

export async function userLogin(req, res) {
  return new Promise((resolve, reject) => {
    req.companyId = undefined;

    const { username, password } = req.body;
  
    const query = 'SELECT * FROM User where username = ?';
    const params = [username];
  
    db.query(query, params, (error, result) => {
      if (error) reject(res.status(500).json({ error }));
  
      if (!result[0]) reject(res.status(401).json({ error: 'Utilisateur incorrect' }));
  
      const user = result[0];
  
      bcrypt.compare(password, user.password)
      .then(valid => {
        if (!valid) reject(res.status(401).json({ error: 'Mot de passe incorrect' }));

        resolve(user.companyId);
      })
      .catch(error => reject(res.status(500).json({ error })));
    });
  });
}

export function createUser(req, res) {
  bcrypt.hash(req.body.password, 5)
    .then(hash => {
      const query = 'INSERT INTO User(companyId, username, password) values(?, ?, ?)';
      const params = [req.body.companyId, req.body.username, hash];

      db.query(query, params, (error, result) => {
        if(error) res.status(400).json({ error }); else res.status(200).json(result);
      });
    })
    .catch(error => res.status(500).json({ error }));
}