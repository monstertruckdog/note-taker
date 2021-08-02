// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.

// const apiDb = require('../db/db.json');
const apiDb = require('../db/db.json')
const fs = require('fs');
const router = require('express').Router();

let returnDataAll;
let customer;

// const dbPath = '../db/db.json';

const getNoteData = () => {
    console.log(`--> inside getNoteData function`);
    router.get('/api/notes', (req, res) => {

      fs.readFile('../db/db.json', (err, json) => {
        if (err) {
          console.log(`Error reading file from disk: ${err}`);
         } else {
           // let obj = JSON.parse(json);
           res.json(obj);
         }
      });
  
  });
    // console.log(`--> I don't know:  ${apiDb}`)
    // const jsonNoteData = fs.readFile('../db/db.json', 'utf8')
    // return JSON.parse(jsonNoteData)
    // fs.readFile('notes', 'utf8', (err, data) => {

    //   if (err) {
    //       console.log(`Error reading file from disk: ${err}`);
    //   } else {
  
    //       // parse JSON string to JSON object
    //       const returnDataAll = JSON.parse(data);
    //       console.log(`--> ALL DATA?:  `, returnDataAll)
    //   }
    // })
}

// ROUTING

module.exports = (app) => {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  // app.get('/api/notes', (req, res) => {
  //   fs.readFile("../db/db.json", "utf8", (err, jsonString) => {
  //     if (err) {
  //       console.log("Error reading file from disk:", err);
  //       return;
  //     }
  //     try {
  //       const customer = JSON.parse(jsonString);
  //       console.log(`--> DID THIS WORK (x91)`); // => "Customer address is: Infinity Loop Drive"
  //     } catch (err) {
  //       console.log("Error parsing JSON string:", err);
  //     }
  //   });
  app.get('/api/notes', (req, res) => {
    console.log(`--> app.get starting`)
    console.log(`--> response?:  `, res)
    fs.readFile('./Develop/db/db.json', 'utf8', (err, data) => {
      console.log(`--> fs.readFile starting`)
      console.log(`--> fs.readFile data:  `, data)
      // console.log(`--> fs.readFile with JSON.parse:  `, JSON.parse(data))
      let obj = JSON.parse(data);
      res.json(obj);
      })

    // fs.readFile(path.resolve(__dirname, "../db/db.json"), (err, data) => {
    //   console.log(`app.get...fs.readFile has fired`)

    //   if (err) {
    //       console.log(`Error reading file from disk: ${err}`);
    //   } else {
  
    //       // parse JSON string to JSON object
    //       const returnDataAll = JSON.parse(data);
    //       console.log(`--> ALL DATA?:  `, returnDataAll)
    //   }
    // });
    // fs.readFileSync('../db/db.json', 'utf8', (error, data) => {
          //if (error) {
            // console.error(error)
        // } else {
            // console.log(`--> get notes output:  ${apiDb}`)
            // res.json(apiDb);
            //return JSON.parse(notesFinal)
        //}
      //});
      //console.log(`--> BEFORE | what is 'apiDb'?:  ${res.json(apiDb)}`);
      //const notesFinal = JSON.stringify(res.json(apiDb));
      // console.log(`--> inside app.get /api/notes:  `, res.json(apiDb))
      // getNoteData();
      // res.json(customer);
      //console.log(`--> AFTER| what is 'apiDb'?:  ${apiDb}`);
      //const notesData = getNoteData();
      //res.send(notesData);
      

  //});
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
    //if (apiDb.length < 5) {
      //apiDb.push(req.body);
      //res.json(true);
    //} else {
      //waitListData.push(req.body);
      //res.json(false);
    
    // console.log(`--> inside app.post api/notes:  ${res.json(req.body)}`)
    apiDb.push(req.body);
    //
    res.json(true);
    }
  );

  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post('/api/clear', (req, res) => {
    // Empty out the arrays of data
    apiDb.length = 0;
    waitListData.length = 0;

    res.json({ ok: true });
  });
};
