const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs');


const startUrl = 'https://100realty.ua/uk/realty_search/apartment/rent/cur_3/kch_2?page=0'

async function grab() {
    //const html = await axios(startUrl)
    const html = fs.readFileSync('./source.html',
        {encoding: 'utf8', flag: 'r'});
    const $ = cheerio.load(html)
    $('.object-additional-info-wrapper').each((i, el) => {
        let room = {}
        room.adress = ($(el).find('.object-address a').text())
        room.quanity = parseFloat($(el).find('.object-rooms .value').text())
        let temp = $(el).find('.cost-field span').text().replace(/\s+/g, '')
        room.price = parseFloat(temp)
        temp = $(el).find('.area a').text()
        room.mstation = temp
        room.floor = $(el).find('.object-floors .value').text()
        room.square = parseFloat($(el).find('.object-square .value').text())
        console.log(room)
        }
    )
}

grab()