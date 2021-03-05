import db from './db.js';

export function getCompanyEvents(req, res) {
  const query = 'SELECT * FROM Event where companyId = ?';
  const params = [req.params.id];

  db.query(query, params, (error, result) => {
    if(error) res.status(500).end(); else res.status(200).json(result);
  });
}

export function getCommpanyUsers(req, res) {
  const query = 'SELECT * FROM User where companyId = ?';
  const params = [req.params.id];

  db.query(query, params, (error, result) => {
    if(error) res.status(500).end(); else res.status(200).json(result);
  });
}
