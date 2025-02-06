import cron from "node-cron";
import axios from "axios";

// const cronTimer = "0 0 * * *";

const cronTimer = "*/15 * * * *";

cron.schedule(cronTimer, async () => {
  const params = {
    base_id: "appa8Xou2kAPyvQhp",
    supermetrics_table_id: "tbl6FSOwWYKQqRcLb",
    taxonomy_values_table_id: "tbllTbzjZGP1koXoJ",
    sheet_url:
      "https://docs.google.com/spreadsheets/d/1K2HtyoyNflu10EMp9oKQsic-D_SRzdt2g5ovUXmuqmA/edit?gid=0",
  };

  const url = "https://publicis.workino.co/super_metrics";
  axios
    .get(url, { params })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  console.log(`${url} - ${response.status}`);
});

cron.schedule(cronTimer, async () => {
  const params = {
    base_id: "appu6VyRFftybZFdc",
    supermetrics_table_id: "tblyORbBdtQkUvbYa",
    taxonomy_values_table_id: "tblcMtn0ztG8LdU3c",
    sheet_url:
      "https://docs.google.com/spreadsheets/d/1HXNep2eSNOrctpr-4Bd7_qsdE42Oz-59NZcKJYsioRI/edit?gid=0",
  };

  const url = "https://publicis.workino.co/super_metrics";
  axios
    .get(url, { params })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  console.log(`${url} - ${response.status}`);
});

// const cronTimerForRefreshWebhook = "0 0 * * * ";

// cron.schedule(cronTimerForRefreshWebhook, async () => {
//   const url =
//     "https://publicis-api-copy-production-8ff1.up.railway.app/webhooks/refresh";
//   axios
//     .get(url)
//     .then((response) => {
//       console.log(response.data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
//   console.log(response.url + " - " + response.status);
// });
