// const fs = require('fs');
// const rooms = fs.readFileSync('./rooms-100pages.json', {encoding: 'utf8', flag: 'r'})
// console.log(JSON.parse(rooms)[0])

var str = "Hello^# World/";
str = str.replace(/[^a-zA-Z ]/g, "") // "Hello World"
console.log(str)