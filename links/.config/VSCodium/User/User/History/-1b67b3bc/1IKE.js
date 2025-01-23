const { JSDOM } = require('jsdom');
const axios = require('axios');
const { BeautifulSoup } = require('beautifulsoup4');

// Set up the URL and headers
const url = 'https://onlyfans.com/your-username';
const headers = {
  'User-Agent': 'YourBot/1.0'
};

// Send a GET request to the URL
axios.get(url, { headers })
  .then((response) => {
    // Create a DOM-like environment
    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    // Parse the HTML content using BeautifulSoup
    const soup = new BeautifulSoup(document.body);

    // Find and extract the desired data (e.g., images, text)
    const images = soup.find_all('img');
    const text = soup.text();

    // Process and store the extracted data
    console.log(images);
    console.log(text);
  })
  .catch((error) => {
    console.error(error);
  });
