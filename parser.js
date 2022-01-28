const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs');

const startUrl = 'https://100realty.ua/uk/realty_search/apartment/rent/cur_3/kch_2?page=' //0
let rooms = []

async function grab() {
    for (let i = 0; i < 100; i++) {
        let html = await axios(startUrl + i)
        //const html = fs.readFileSync('./source.html',{encoding: 'utf8', flag: 'r'})
        let $ = cheerio.load(html.data)

        $('.realty-object-card').each((i, el) => {
                let room = {}
                room.adress = ($(el).find('.object-address a').text())
                room.quanity = parseFloat($(el).find('.object-rooms .value').text())
                let temp = $(el).find('.cost-field span').text().replace(/\s+/g, '')
                room.price = parseFloat(temp)
                temp = $(el).find('.area a').first().text()
                room.mstation = temp
                temp = $(el).find('.object-floors .value').text()
                room.floor = parseFloat(temp)
                room.totalFloors = parseFloat(temp.split('/')[1])
                room.square = parseFloat($(el).find('.object-square .value').text())
                room.district = $(el).find('.object-region a').first().text()
                temp = $(el).find('.descr').text().replace(/\n/g, '').replace(/\s+/g, " ")
                room.description = temp.trim()
                temp = $(el).find('.object-address a').attr('href')
                room.link = temp
                room.id = temp.split('/')[3]
                //room.img = $(el).find('.slick-track .slides__item').first().html()

                rooms.push(room)
            }
        )
    }
    fs.writeFileSync("rooms.json", JSON.stringify(rooms))
}

grab()