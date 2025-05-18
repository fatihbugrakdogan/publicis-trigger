import cron from "node-cron";
import axios from "axios";
import { syncLinkedInSheetToMain } from "./sheetsSync.js";
import { extractSheetIdFromUrl } from "./sheetsSync.js";

// const cronTimer = "0 0 * * *";

// Schedule for 30 minutes past every hour (12:30, 13:30, etc.)
const cronTimer = "15 * * * *";


/// Input Schema

/// supermetrics_table_id Airtable Adset Metrics Table
/// taxonomy_values_table_id Airtable Taxonomy Values Table
/// campaign_metrics_table_id Airtable Campaign Metrics Table

// Neom Base
cron.schedule(cronTimer, async () => {
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
/// Aramco Base
cron.schedule(cronTimer, async () => {
  const params = {
    base_id: "appu6VyRFftybZFdc",
    supermetrics_table_id: "tblpWruYgLJeTfT3q",
    taxonomy_values_table_id: "tblcMtn0ztG8LdU3c",
    campaign_metrics_table_id: "tblKV6LEhWHp2r10L",

    sheet_url:
      "https://docs.google.com/spreadsheets/d/1HXNep2eSNOrctpr-4Bd7_qsdE42Oz-59NZcKJYsioRI/edit?gid=0",
  };

  const url = "https://publicis-api-aramco-base-production.up.railway.app/super_metrics";
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

/// PG Base
cron.schedule(cronTimer, async () => {
  const params = {
    base_id: "appANXR8k6pZ9Xh4i",
    supermetrics_table_id: "tblOKhAKhlO1vawrp",
    taxonomy_values_table_id: "tbl7L98AugGdUMAUr",
    campaign_metrics_table_id: "tblBuCVOFggplKq2h",
    sheet_url:
      "https://docs.google.com/spreadsheets/d/1LUnVFoM9_ZDIv2j47sbrCm0O60AX35kjmVtjt_lIu-M/edit?gid=0",
  };

  const url = "https://publicis-pandg-base-production.up.railway.app/super_metrics";
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

// Nestle Base
cron.schedule(cronTimer, async () => {
  const params = {
    base_id: "app0l5cLckTzOaMoU",
    supermetrics_table_id: "tblO6aO9JXYxWfOa1",
    taxonomy_values_table_id: "tblEW45nyKogmPfkS",
    campaign_metrics_table_id: "tblr5K6Tkzgr6bMds",
    sheet_url:
      "https://docs.google.com/spreadsheets/d/1uUaUa0O_zlAnAwOiwb9jO7ngM77aEFnQqHxvfWczLvg",
  };

  const url = "https://publicis-nestle-base-production.up.railway.app/super_metrics";
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

// Visa Base
cron.schedule(cronTimer, async () => {
  const params = {
    base_id: "appu7C1c4gbJFjlw7",
    supermetrics_table_id: "tblyvqO7TcCOiSMeI",
    taxonomy_values_table_id: "tblISSu4hCpqezpqL",
    campaign_metrics_table_id: "tbl9KL9G1O2cjPewl",
    sheet_url:
      "https://docs.google.com/spreadsheets/d/1dKPY8vwGdNNP1pVLd3r29fSn2_vB8yIWZI8TK08Sgv0",
  };

  const url = "https://publicis-visa-base-production.up.railway.app/super_metrics";
  
  try {
    // Extract sheet IDs from URLs
    const sourceSheetUrl = 'https://docs.google.com/spreadsheets/d/1p1V9i6VeyvKT9kIsA_Y6aFE5_kz3XhN2-D8y59a8adw/edit';
    const targetSheetUrl = params.sheet_url;
    
    const sourceSheetId = extractSheetIdFromUrl(sourceSheetUrl);
    const targetSheetId = extractSheetIdFromUrl(targetSheetUrl);
    
    if (!sourceSheetId || !targetSheetId) {
      throw new Error('Invalid sheet URL');
    }

    // First sync the LinkedIn sheet
    await syncLinkedInSheetToMain(sourceSheetId, targetSheetId);
    
    // Then proceed with the regular super metrics sync
    const response = await axios.get(url, { params });
    console.log(response.data);
    console.log(`${url} - ${response.status}`);
  } catch (error) {
    console.error('Error in Visa base sync:', error);
  }
});

