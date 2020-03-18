const { Pool } = require('pg');
const config = require('./../../config.json');
const utils = require('./../../utils');

const pool = new Pool(config);

module.exports.getStatistic = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  pool.connect((err, client, release) => {
    if (err) {
      return callback(null, utils.convertToRespose(err, 500));
    }
    client.query('SELECT EXTRACT(YEAR FROM p."date") AS "year", EXTRACT(MONTH FROM p."date") AS "month", p."cost", c."title" FROM purchases AS p JOIN categories AS c ON p."category_id" = c."id";',
    (err, result) => {
      release()
      if (err) {
        return callback(null, utils.convertToRespose(err, 500));
      }
      callback(null, utils.convertToRespose(result.rows));
    })
  });
};