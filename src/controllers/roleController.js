import db from './db.js';

export function getRoleItems(req, res) {
  const query = 'SELECT * FROM RoleItem where roleId = ?';
  const params = [req.params.id];

  db.query(query, params, (error, result) => {
    if (error) res.status(500).json({ error: 'Erreur interne du serveur'});
    else res.status(200).json(result);
  });
}