import db from './db.js';

export function addItemStats(req, res) {
  const query = 'INSERT INTO ItemStatistics(itemId, quantity, date, roleId) values (?, ?, ?, ?)';
  const params = [
    req.body.itemId,
    req.body.quantity,
    req.body.date,
    req.body.roleId
  ];

  db.query(query, params, (error, result) => {
    if(error) res.status(500).end(); else res.status(201).json(result);
  });
}