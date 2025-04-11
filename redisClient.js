const redis = require('redis');
const { redis: redisConfig } = require('./config');

const client = redis.createClient({
  host: redisConfig.host,
  port: redisConfig.port,
  // password: redisConfig.password, // Uncomment if needed
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

module.exports = client;
