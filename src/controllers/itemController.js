import db from './db.js';

export async function deleteItem(req, res) {
  
  const query = 'DELETE from Item where uniqueId = ?';
  const params = [req.params.id];
  
  db.query(query, params, (error) => {
    if (error) res.status(500).json({ error: 'Erreur interne du serveur'});
    else res.status(204).send();
  });
}

export async function createItem(req, res) {
  const item = {
    ...req.body
  }

  const query = 'INSERT INTO Item(eventId, name, price) values(?, ?, ?)';
  const params = [item.eventId, item.name, item.price];
  
  db.query(query, params, (error, result) => {
    if (error) res.status(500).json({ error: 'Erreur interne du serveur'});
    else res.status(201).end(result.insertId.toString());
  });
}