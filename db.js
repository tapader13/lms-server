const mysql = require('mysql2');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'minhaj5765',
  database: 'lms',
});
con.connect((err) => {
  if (err) {
    console.log(`not connected database`);
  } else {
    console.log(`database connected properly`);
  }
});
module.exports = con;