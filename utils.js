const convertToRespose = (body, status) => ({
  "statusCode": status || 200,
  "headers": {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  },
  "body": JSON.stringify(body)
});

module.exports = {
  convertToRespose
}