import { loadPage } from "src/options/scripts/load-page";

loadPage();
chrome.storage.local.get(null, function (items) {
  const allKeys = Object.keys(items);
  console.log(allKeys);
});
