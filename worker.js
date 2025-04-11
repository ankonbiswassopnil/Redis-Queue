const client = require('./redisClient');

const processJobs = () => {
  console.log('Worker started...');

  setInterval(() => {
    client.rpop('myQueue', (err, jobStr) => {
      if (err || !jobStr) return;

      const job = JSON.parse(jobStr);
      client.set(`jobStatus:${job.id}`, 'processing');

      try {
        console.log('Processing:', job.data);

        // Simulate failure randomly
        if (Math.random() < 0.3) throw new Error('Random fail');

        // Simulate success delay
        setTimeout(() => {
          console.log(`Success: ${job.id}`);
          client.set(`jobStatus:${job.id}`, 'done');
        }, 500);
      } catch (e) {
        console.log(`Failed: ${job.id} — ${e.message}`);
        job.retries += 1;

        if (job.retries < job.maxRetries) {
          client.lpush('myQueue', JSON.stringify(job));
          client.set(`jobStatus:${job.id}`, `retrying:${job.retries}`);
        } else {
          client.lpush('retryQueue', JSON.stringify(job));
          client.set(`jobStatus:${job.id}`, 'failed');
        }
      }
    });
  }, 1000);
};

processJobs();
