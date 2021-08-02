const fs = require('fs');

fs.readFile('./Develop/db/db.json', 'utf8', (err, data) => {
    console.log(`--> fs.readFile starting`)
    console.log(`--> fs.readFile data:  `, data)
    // console.log(`--> fs.readFile data.title?:  `, data[0].text)
    console.log(`--> fs.readFile with JSON.parse:  `, JSON.parse(data))
    const dataVal = JSON.parse(data)
    console.log(`--> fs.readFile with JSON.parse, title value:  `, dataVal[0].title)
});