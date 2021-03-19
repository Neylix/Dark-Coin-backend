import db from './db.js';
import util from 'util';

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

export async function getEventDatas(req, res) {
  const datas = {
    items: [],
    roles: []
  };

  const dbQuery = util.promisify(db.query).bind(db);

  const params = [req.params.id];

  let query = 'SELECT * FROM Item where eventId = ?';

  await dbQuery(query, params)
    .then(result => {
      datas.items = result;
    })
    .catch(() => res.status(500).end());

  query = 'SELECT * FROM Role where eventId = ?';

  await dbQuery(query, params)
    .then(result => {
      datas.roles = result;
    })
    .catch(() => res.status(500).end());

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
    })
    .catch(() => res.status(500).end());

  res.status(200).json(datas);
}