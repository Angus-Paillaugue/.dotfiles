import { loadPage } from "src/options/scripts/load-page";

loadPage();
chrome.storage.local.get("config", function ({ config }) {
  config.bookmarks = {
    type: "user-defined",
    userDefined: [
      {
        color: "#c71610",
        iconColor: "#ffffff",
        iconType: "ri-mail-line",
        name: "Gmail",
        url: "https://mail.google.com/mail/u/0/?pli=1#inbox"
      },
      {
        color: "#FF9900",
        iconColor: "#ffffff",
        iconType: "ri-amazon-line",
        name: "Amazon",
        url: "https://amazon.fr"
      },
      {
        color: "#FF6900",
        iconColor: "#ffffff",
        iconType: "ri-shirt-line",
        name: "Zalando",
        url: "https://www.zalando.fr/accueil-homme/"
      },
      {
        color: "#0F9D58",
        iconColor: "#ffffff",
        iconType: "ri-layout-grid-line",
        name: "Outfits",
        url: "https://docs.google.com/spreadsheets/d/1QaDtDMpJl4uiw0J2ssXUotZGuQLa1diCVlbX9w4EcGg/edit#gid=158467180"
      },
      {
        color: "#000000",
        iconColor: "#ffffff",
        iconType: "ri-graduation-cap-line",
        name: "Ent",
        url: "https://cas.univ-tlse3.fr/cas/login?service=https://ent.univ-tlse3.fr/uPortal/Login"
      },
      {
        color: "#FF5700",
        iconColor: "#ffffff",
        iconType: "ri-reddit-line",
        name: "Reddit",
        url: "https://www.reddit.com/"
      },
      {
        color: "#0F9D58",
        iconColor: "#ffffff",
        iconType: "ri-drive-line",
        name: "Drive",
        url: "https://drive.google.com/drive/u/0/my-drive"
      },
      {
        color: "#3fbaf1",
        iconColor: "#ffffff",
        iconType: "ri-home-gear-line",
        name: "Home assistant",
        url: "https://ha.paillaugue.fr/"
      },
      {
        color: "#0095d5",
        iconColor: "#ffffff",
        iconType: "ri-server-line",
        name: "Nas",
        url: "http://truenas.local/"
      }
    ]
  };
  // chrome.storage.local.set({ config });
});
