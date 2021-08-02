const { randomUUID } = require('crypto');
const fs = require('fs');
const uuid = require('uuid');

fs.readFile('./Develop/db/db_test.json', 'utf8', (err, data) => {
    console.log(`--> fs.readFile starting`)
    console.log(`--> fs.readFile data:  `, data)
    // console.log(`--> fs.readFile data.title?:  `, data[0].text)
    console.log(`--> fs.readFile with JSON.parse:  `, JSON.parse(data))
    // const dataVal = JSON.parse(data) // <-- this works
    const dataValAlt = JSON.parse({
        id: data.id,
        title: data.title,
        text: data.text

    })
    console.log(`--> fs.readFile with JSON.parse, title value:  `, dataVal[0].title)
    console.log(`--> fs.readFile with JSON.parse --> new format (with ID):  `, dataValAlt)
});