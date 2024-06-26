import cron from "node-cron";
import axios from "axios"; 

const cronTimer = "*/30 * * * *"



cron.schedule(cronTimer, async () => {
  const url = "https://publicisairtableintegration-production.up.railway.app/super_metrics"
  axios.get(url).then((response) => {
    console.log(response.data);
  }).catch((error) => {
    console.error(error);
  });
  console.log(response.url + " - " + response.status);
});
