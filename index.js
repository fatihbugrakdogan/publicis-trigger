import cron from "node-cron";

const cronTimer = "*/5 * * * *"



cron.schedule(cronTimer, async () => {
  const url = "https://publicisairtableintegration-production.up.railway.app/super-metrics"
  const response = await fetch(url);
  console.log(response.url + " - " + response.status);
});
