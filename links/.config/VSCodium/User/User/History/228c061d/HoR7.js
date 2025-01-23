browser.runtime.onInstalled.addListener(() => {
  const tabUrl = browser.runtime.getURL("redirector/redirector.html");
});
