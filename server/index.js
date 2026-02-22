
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const iconv = require('iconv-lite');

const app = express();
const port = 3001;

app.use(cors());

app.get('/api/crawl', async (req, res) => {
  try {
    const url = 'https://finance.naver.com/item/board.naver?code=005930'; // Example: Samsung Electronics
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      },
      responseType: 'arraybuffer',
      responseEncoding: 'binary',
    });

    const decodedContent = iconv.decode(response.data, 'EUC-KR');
    const $ = cheerio.load(decodedContent);

    const list = [];
    $('.type2 tbody tr').each((i, elem) => {
      if (i > 0 && $(elem).find('td.title a').text().trim() !== '') {
        list.push({
          id: i,
          title: $(elem).find('td.title a').text().trim(),
          author: $(elem).find('td.p11').first().text().trim(),
          date: $(elem).find('td.p11').last().text().trim(),
        });
      }
    });
    
    console.log('Crawled data:', list); // Log the crawled data

    res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to crawl data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
