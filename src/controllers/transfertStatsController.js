import db from './db.js';

export function addTransfertStats(req, res) {
  const query = 'INSERT INTO TransfertStatistics(eventId, addedValue, refundValue, date) values (?, ?, ?, ?)';
  const params = [
    req.body.eventId,
    req.body.addedValue,
    req.body.refundValue,
    req.body.date
  ];

  db.query(query, params, (error, result) => {
    if(error) res.status(500).end(); else res.status(201).json(result);
  });
}