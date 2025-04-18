import cron from "node-cron";
import axios from "axios";

// const cronTimer = "0 0 * * *";

// Schedule for 30 minutes past every hour (12:30, 13:30, etc.)
const cronTimerFirst = "15 * * * *";

// Schedule for on the hour, every hour (12:00, 13:00, etc.)
const cronTimerSecond = "30 * * * *";

// Schedule for 20 minutes past every hour (12:20, 13:20, etc.)
const cronTimerThird = "45 * * * *";

// Schedule for 60 minutes past every hour (12:50, 13:50, etc.)
const cronTimerFourth = "0 * * * *";

const cronTimerFifth = "5 * * * *";

cron.schedule(cronTimerFirst, async () => {
  const params = {
    base_id: "appa8Xou2kAPyvQhp",
    supermetrics_table_id: "tbl7D1K5K0T3sQ6lS",
    taxonomy_values_table_id: "tbllTbzjZGP1koXoJ",
    campaign_metrics_table_id: "tbl8578qdxb1oILUq",
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

cron.schedule(cronTimerSecond, async () => {
  const params = {
    base_id: "appu6VyRFftybZFdc",
    supermetrics_table_id: "tblpWruYgLJeTfT3q",
    taxonomy_values_table_id: "tblcMtn0ztG8LdU3c",
    campaign_metrics_table_id: "tblKV6LEhWHp2r10L",

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

cron.schedule(cronTimerThird, async () => {
  const params = {
    base_id: "appANXR8k6pZ9Xh4i",
    supermetrics_table_id: "tblOKhAKhlO1vawrp",
    taxonomy_values_table_id: "tbl7L98AugGdUMAUr",
    campaign_metrics_table_id: "tblBuCVOFggplKq2h",
    sheet_url:
      "https://docs.google.com/spreadsheets/d/1LUnVFoM9_ZDIv2j47sbrCm0O60AX35kjmVtjt_lIu-M/edit?gid=0",
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

cron.schedule(cronTimerFourth, async () => {
  const params = {
    base_id: "app0l5cLckTzOaMoU",
    supermetrics_table_id: "tblO6aO9JXYxWfOa1",
    taxonomy_values_table_id: "tblEW45nyKogmPfkS",
    campaign_metrics_table_id: "tblr5K6Tkzgr6bMds",
    sheet_url:
      "https://docs.google.com/spreadsheets/d/1uUaUa0O_zlAnAwOiwb9jO7ngM77aEFnQqHxvfWczLvg",
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

cron.schedule(cronTimerFifth, async () => {
  const params = {
    base_id: "appu7C1c4gbJFjlw7",
    supermetrics_table_id: "tblyvqO7TcCOiSMeI",
    taxonomy_values_table_id: "tblISSu4hCpqezpqL",
    campaign_metrics_table_id: "tbl9KL9G1O2cjPewl",
    sheet_url:
      "https://docs.google.com/spreadsheets/d/1dKPY8vwGdNNP1pVLd3r29fSn2_vB8yIWZI8TK08Sgv0",
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
