const client = require('./redisClient');

const moveDelayedJobsToMainQueue = () => {
  setInterval(() => {
    const now = Date.now();
    client.zrangebyscore('delayedQueue', 0, now, (err, jobs) => {
      if (err || !jobs || jobs.length === 0) return;

      jobs.forEach((jobStr) => {
        client.lpush('myQueue', jobStr);
        const job = JSON.parse(jobStr);
        client.set(`jobStatus:${job.id}`, 'pending');
        client.zrem('delayedQueue', jobStr);
      });
    });
  }, 1000);
};

moveDelayedJobsToMainQueue();
