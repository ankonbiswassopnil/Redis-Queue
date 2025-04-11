const client = require('./redisClient');

const addJobToQueue = (jobData) => {
  const job = JSON.stringify(jobData);
  client.lpush('myQueue', job, (err, res) => {
    if (err) console.error('Error adding job:', err);
    else console.log('Job added to queue:', res);
  });
};

module.exports = addJobToQueue;
