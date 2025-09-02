const axios = require('axios');
const cheerio = require('cheerio');
const readline = require('readline-sync');
const fs = require('fs');

const url = readline.question("");

async function parseQuotes() {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const quotes = [];

        $('.quote').each(function(index, element) {
            const text = $(element).find('.text').text();
            const author = $(element).find('.author').text();
            quotes.push({ text, author });
        });

        
        fs.writeFileSync('quotes.json', JSON.stringify(quotes, null, 2));
        console.log(`Парсинг завершено. Збережено ${quotes.length} цитат у quotes.json`);
    } catch (error) {
        console.error('Помилка при парсингу:', error);
    }
}

parseQuotes();
