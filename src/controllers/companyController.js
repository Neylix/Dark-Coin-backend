import db from './db.js';
import bcrypt from 'bcrypt';

export async function companyLogin(req, res) {
  req.companyId = undefined;

  const { mail, password } = req.body;

  const query = 'SELECT * FROM Company where mail = ?';
  const params = [mail];

  db.query(query, params, (error, result) => {
    if (error) return res.status(401).json({ error });

    if (!result[0]) return res.status(401).json({ error: 'Mail incorrect' });

    const company = result[0];

    bcrypt.compare(password, company.password)
    .then(valid => {
      if (!valid) return res.status(401).json({ error: 'Mot de passe incorrect' });

      req.companyId = company.uniqueId;
    })
    .catch(error => res.status(500).json({ error }));
  });
}

export function getCompanyEvents(req, res) {
  const query = 'SELECT * FROM Event where companyId = ?';
  const params = [req.params.id];

  db.query(query, params, (error, result) => {
    if(error) res.status(500).json({ error }); else res.status(200).json(result);
  });
}

export async function getCompany(companyId) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM Company where uniqueId = ?';
    const params = [companyId];
  
    db.query(query, params, (error, result) => {
      if(error) reject(null); else resolve(result[0]);
    });
  });
}
