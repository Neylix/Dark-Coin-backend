import db from './db.js';
import bcrypt from 'bcrypt';

export async function companyLogin(req, res) {
  return new Promise((resolve, reject) => {
    req.companyId = undefined;

    const { mail, password } = req.body;

    const query = 'SELECT * FROM Company where mail = ?';
    const params = [mail];

    db.query(query, params, (error, result) => {
      if (error) return reject(res.status(500).json({ error: 'Erreur interne du serveur' }));

      if (!result[0]) return reject(res.status(401).json({ error: 'Identifiants incorrects' }));

      const company = result[0];

      bcrypt.compare(password, company.password)
      .then(valid => {
        if (!valid) return reject(res.status(401).json({ error: 'Identifiants incorrects' }));

        resolve(company.uniqueId);
      })
      .catch(() => reject(res.status(500).json({ error: 'Erreur interne du serveur' })));
    });
  });
}

export function getCompanyEvents(req, res) {
  const query = 'SELECT * FROM Event where companyId = ?';
  const params = [req.params.id];

  db.query(query, params, (error, result) => {
    if (error) res.status(500).json({ error: 'Erreur interne du serveur' });
    else res.status(200).json(result);
  });
}

export async function getCompany(companyId) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM Company where uniqueId = ?';
    const params = [companyId];
  
    db.query(query, params, (error, result) => {
      if (error) reject(null);
      else resolve(result[0]);
    });
  });
}
