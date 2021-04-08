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
  
    query = 'SELECT * FROM Role where eventId = ?';
  
    await dbQuery(query, params)
      .then(result => {
        datas.roles = result;
      });
  
    query = 'SELECT ri.* FROM Role r ' +
    'join RoleItem ri on ri.roleId = r.uniqueId '+
    'where r.eventId = ?';
  
    await dbQuery(query, params)
      .then(result => {
        datas.roles.forEach(role => {
          const roleItems = result.filter(ri => ri.roleId === role.uniqueId);
          role.items = [];
          roleItems.forEach(roleItem => {
            role.items.push(datas.items.find(item => item.uniqueId === roleItem.itemId));
          });
        });
      });
  
    res.status(200).json(datas);
  } catch(error) {
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}