const client = require('./redisClient');
const { v4: uuidv4 } = require('uuid');

const addJobToQueue = (jobData, delay = 0) => {
  const jobId = uuidv4();
  const fullJob = {
    id: jobId,
    data: jobData,
    retries: 0,
    maxRetries: 3,
  };

  const jobStr = JSON.stringify(fullJob);

  if (delay > 0) {
    const delayTime = Date.now() + delay;
    client.zadd('delayedQueue', delayTime, jobStr);
    client.set(`jobStatus:${jobId}`, 'delayed');
  } else {
    client.lpush('myQueue', jobStr);
    client.set(`jobStatus:${jobId}`, 'pending');
  }

  return jobId;
};

module.exports = addJobToQueue;
