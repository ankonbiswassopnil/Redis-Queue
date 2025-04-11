const client = require('./redisClient');

const processJobs = () => {
  console.log('Worker started, polling Redis queue...');

  setInterval(() => {
    client.rpop('myQueue', (err, jobStr) => {
      if (err) return console.error('Error reading job:', err);
      if (!jobStr) return;

      const job = JSON.parse(jobStr);
      console.log('Processing job:', job);

      // Simulate task processing (e.g., sending email, etc.)
      setTimeout(() => {
        console.log(`✅ Job done: ${JSON.stringify(job)}`);
      }, 1000);
    });
  }, 1000); // every second
};

processJobs();
