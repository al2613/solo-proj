const pg = require('pg');

const connection = 'postgres://al2613:Anne0101@localhost/mdn_notes';
const client = new pg.Client(connection);
client.connect()
  .then(() =>console.log ('db connected'))
  .catch(e => console.error ('connection error', e));

function getEvent(req, res) {
  console.log(req.body);
  const query = `SELECT * FROM notes;`;
  client.query(query, (err, result) => {
    if (err) throw new Error(err);
    res.json(result.rows);
  });
}

function postEvent(req, res) {
  console.log(req.body);

  const query = `INSERT INTO notes ("topic", "notes") VALUES ('${req.body.topic}', '${req.body.notes}');`;

  client.query(query, (err, result) => {
    if (err) throw new Error(err);
    console.log('success!');
    res.redirect('/');
  });
}

function deleteEvent(req, res) {  
  const query = `DELETE FROM notes WHERE topic = '${req.params.topic}';`;
  client.query(query, (err, result) => {
    if (err) throw new Error(err);
    console.log('deleted!');
  });

  client.query(`SELECT * FROM notes;`, (err, result) => {
    if (err) throw new Error(err);
    console.log('result', result)
    res.json(result.rows);
  });
}

module.exports = { getEvent, postEvent, deleteEvent }