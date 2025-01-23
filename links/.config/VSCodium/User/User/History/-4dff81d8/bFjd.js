const fetchIcons = async () => {
  const response = await fetch('https://vercel.com/geist/icons');
  const data = await response.text();

  const regex =
    /<section(.*)>.(*)<div class="pointer-events-none(.*)">(.*)<\/div><\/section>/g;

  let matches;
  const results = [];

  while ((matches = regex.exec(data)) !== null) {
    const card = matches[0];
    const svg = card.match(/<svg.*<\/svg>/g);
    const name = card.match(/<p(.*)>(.*)<\/p>/g);
    console.log(card)
  }
  return results;
};

(async() => {
  const icons = await fetchIcons();
  // console.log(icons)
  const template = `
  "{{name}}": {
    component: () => import('./fileIcons/{{name}}').then((m) => m.default)
  },`;
})()
