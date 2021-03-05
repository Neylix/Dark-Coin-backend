import db from './db.js';

export function getEventItems(req, res) {
  const query = 'SELECT * FROM Item where eventId = ?';
  const params = [req.params.id];

  db.query(query, params, (error, result) => {
    if(error) res.status(500).end(); else res.status(200).json(result);
  });
}

export function getEventRoles(req, res) {
  const query = 'SELECT * FROM Role where eventId = ?';
  const params = [req.params.id];

  db.query(query, params, (error, result) => {
    if(error) res.status(500).end(); else res.status(200).json(result);
  });
}