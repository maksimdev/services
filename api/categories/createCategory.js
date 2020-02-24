const { Pool } = require('pg');
const config = require('./../../config.json');
const utils = require('./../../utils');

const pool = new Pool(config);

module.exports.createCategory = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const { title } = JSON.parse(event.body);
  if(!title) return callback(null, utils.convertToRespose('Error: props are invalid', 500));

  pool.connect((err, client, release) => {
    if (err) {
      return callback(null, utils.convertToRespose(err, 500))
    }
    client.query(
      'INSERT INTO public.categories (title) VALUES($1) RETURNING *;',
      [title],
      (err, result) => {
      release()
      if (err) {
        return callback(null, utils.convertToRespose(err, 500))
      }
      callback(null, utils.convertToRespose(result.rows[0]));
    })
  });
};