import { loadPage } from "src/options/scripts/load-page";

loadPage();
chrome.storage.local.get("config", function ({ config: { bookmarks } }) {
  console.log(config);
});
