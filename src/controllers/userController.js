import db from './db.js';

export function getUser(req, res) {
  const query = 'SELECT * FROM User where username = ? and password = ?';
  const params = [req.body.username, req.body.password];

  db.query(query, params, (error, result) => {
    if(error) res.status(500).end(); else res.status(200).json(result);
  });
}
