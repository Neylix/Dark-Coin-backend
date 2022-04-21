import db from './db.js';
import util from 'util';

export async function getEventDatas(req, res) {
  const datas = {
    items: [],
    roles: []
  };

  const dbQuery = util.promisify(db.query).bind(db);
  try {
    const params = [req.params.id];

    let query = 'SELECT * FROM Item where eventId = ?';
  
    await dbQuery(query, params)
      .then(result => {
        datas.items = result;
      });

    query = 'SELECT * FROM Item i ' + 
    'join ItemStatistics ist on ist.itemId = i.uniqueId ' +
    'where i.eventId = ?';

    await dbQuery(query, params).then(result => {
      datas.items.forEach(item => {
        const itemStats = result.filter(is => is.itemId === item.uniqueId);
        item.itemStatistics = [];
        itemStats.forEach(itemStat => {
          item.itemStatistics.push(itemStat);
        });
      });
    });

    query = 'SELECT * FROM Role where eventId = ?';
  
    await dbQuery(query, params)
      .then(result => {
        datas.roles = result;
      });
  
    query = 'SELECT ri.* FROM Role r ' +
    'join RoleItem ri on ri.roleId = r.uniqueId ' +
    'where r.eventId = ?';
  
    await dbQuery(query, params).then(result => {
      datas.roles.forEach(role => {
        const roleItems = result.filter(ri => ri.roleId === role.uniqueId);
        role.items = [];
        roleItems.forEach(roleItem => {
          role.items.push(roleItem.itemId);
        });
      });
    });
  
    res.status(200).json(datas);
  } catch(error) {
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

export async function createEvent(req, res) {
  const event = {
    ...req.body
  }

  const companyId = req.companyId

  const query = 'INSERT INTO Event(companyId, name, beginingDate, endingDate) values(?, ?, ?, ?)';
  const params = [companyId, event.name, event.beginingDate, event.endingDate];
  
  db.query(query, params, (error, result) => {
    if (error) res.status(500).json({ error: 'Erreur interne du serveur'});
    else res.status(201).end(result.insertId.toString());
  });
}

export async function updateEvent(req, res) {
  const event = {
    ...req.body
  }

  const eventId = req.params.id

  const query = 'UPDATE Event set name = ?, beginingDate = ?, endingDate = ? where uniqueId = ?';
  const params = [event.name, event.beginingDate, event.endingDate, eventId];
  
  db.query(query, params, (error) => {
    if (error) res.status(500).json({ error: 'Erreur interne du serveur'});
    else res.status(200).send();
  });
}