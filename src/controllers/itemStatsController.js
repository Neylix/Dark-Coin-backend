import db from './db.js';

export function addItemStats(req, res) {
  if (req.body.itemStats[0]) {
    const query = 'INSERT INTO ItemStatistics(itemId, quantity, date, roleId, chipId) values (?, ?, ?, ?, ?)';
    req.body.itemStats.forEach(itemStat => {
      const params = [
        itemStat.itemId,
        itemStat.quantity,
        itemStat.date,
        itemStat.roleId,
        itemStat.chipId
      ];
    
      db.query(query, params, (error) => {
        if (error) return res.status(500).json({ error: 'Erreur interne du serveur '});
      });
    });
    res.status(201).json({message: 'Added'});
  } else {
    res.status(400).json({ error: 'Le format des données n\'est pas un tableau'});
  }
}