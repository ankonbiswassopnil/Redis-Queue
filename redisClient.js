const redis = require('redis');

const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
  // password: 'your_password', // if needed
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

module.exports = client;
