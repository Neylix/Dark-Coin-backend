import db from './db.js';

export function addTransfertStats(req, res) {
  const query = 'INSERT INTO TransfertStatistics(eventId, addedValue, refundValue, date, chipId, roleId)'+
  ' values (?, ?, ?, ?, ?, ?)';
  const params = [
    req.body.eventId,
    req.body.addedValue,
    req.body.refundValue,
    req.body.date,
    req.body.chipId,
    req.body.roleId
  ];

  db.query(query, params, (error) => {
    if (error) res.status(500).json({ error: 'Erreur interne du serveur'});
    else res.status(201).json({ message: 'Valeur ajoutée'});
  });
}