import config from '../config.js';
import mysql from 'mysql';

// Connect to Database
const db = mysql.createPool({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName
});

if(db) console.log('Connected to Database !'); else console.log('Error on database connection');


export default db;