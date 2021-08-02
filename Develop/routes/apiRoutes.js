// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.

// const apiDb = require('../db/db.json');
const apiDb = require('../db/db.json')
const fs = require('fs');
const router = require('express').Router();


// ROUTING

module.exports = (app) => {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get('/api/notes', (req, res) => {
    console.log(`--> app.get starting`)
    // console.log(`--> response?:  `, res)
    fs.readFile('./Develop/db/db.json', 'utf8', (err, data) => {
      console.log(`--> fs.readFile starting`)
      console.log(`--> fs.readFile data:  `, data)
      // console.log(`--> fs.readFile with JSON.parse:  `, JSON.parse(data))
      let obj = JSON.parse(data);
      res.json(obj);
      })
});


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the apiDb array)
  // ---------------------------------------------------------------------------

  app.post('/api/notes', (req, res) => {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    console.log(`--> request body:  `, req.body);
    
    fs.readFile('./Develop/db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.log(`Error while attempting to read file -------->\n${err}`)
      } else {
        // const newNoteData = JSON.parse(req.body);
          apiDb.push(req.body);
          fs.writeFile('./Develop/db/db.json', JSON.stringify(apiDb), (err) => {
              if (err) {
                  console.log(`Error writing file: ${err}`);
              }
          });
      }
  
  });
    // fs.writeFile('./Develop/db/db.json', newNoteData, 'utf8', (err) => {
    //   if (err) {
    //     console.log(`Error during file write -------->\n${err}`);
    //   } else {
    //     console.log(`Data stored successfully`)
    //   }
    // });
    // if (apiDb.length < 5) {
    // if (apiDb) {
    //   // fs.writeFile('./Develop/db/db.json', )
    //   apiDb.push(req.body);
    //   res.json(true);
    // } else {
    //   waitListData.push(req.body);
    //   res.json(false);
    //   console.log(`--> inside app.post api/notes:  ${res.json(req.body)}`)
    //   apiDb.push(req.body);
    //   res.json(true);
    // }
  });

  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post('/api/clear', (req, res) => {
    // Empty out the arrays of data
    apiDb.length = 0;
    waitListData.length = 0;

    res.json({ ok: true });
  });
};
