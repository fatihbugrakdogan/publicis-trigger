const axios = require('axios');
const cron = require('node-cron');

// Schedule the task to run every hour
cron.schedule('0 * * * *', async () => {
  try {
    await axios.post('https://publicisairtableintegration-production.up.railway.app/super-metrics');
    console.log('Success');
  } catch (error) {
    console.error('Error making request:', error);
  }
});
