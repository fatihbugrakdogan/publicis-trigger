import cron from "node-cron";
import axios from "axios"; 

const cronTimer = "*/5 * * * *"



cron.schedule(cronTimer, async () => {
  const url = "https://publicisairtableintegration-production.up.railway.app/super-metrics"
  axios.get(url).then((response) => {
    console.log(response.data);
  }).catch((error) => {
    console.error(error);
  });
  console.log(response.url + " - " + response.status);
});
