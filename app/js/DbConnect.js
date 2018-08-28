const path = require('path');

const sqlite3 = require('sqlite3');
const dbFilePath = path.resolve(__dirname, '../userdata/database.db');
//#endregion

//console.log(dbFilePath)

//connect to the database http://www.sqlitetutorial.net/sqlite-nodejs/connect/
let db = new sqlite3.Database(dbFilePath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the main SQlite database.');
});

db.serialize(() => {
  db.each(`SELECT ID as id, Name as name, Type as type FROM Tracks`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.id + "\t" + row.name + "\t" + row.type);
  });
});

/*
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});
*/

