const apiDb = require('../db/db.json')
const fs = require('fs');
// const router = require('express').Router();
const uuid = require('uuid');


console.log('STARTING DATA')
console.log(`LENGTH:  `, apiDb.length)
console.log(apiDb)



module.exports = (app) => {
  // READ NOTES
  app.get('/api/notes', (req, res) => {
    // HOW TO REPRODUCE ISSUE:
    // 1.  Un-comment any console.log inside this "READ NOTES" `app.get('/api/notes')`
    // 2.  Run app
    // 3.  Delete a note
    // 4.  Refresh page
    //       --> Error occurs
    console.log(`--> app.get starting`)
    fs.readFile('./Develop/db/db.json', 'utf8', (err, data) => {
      // console.log(`--> fs.readFile starting`)
      //console.log(`--> fs.readFile data:  `, data)
      // const name = 'noah'
      // console.log(`TEST ${name}`)
      // console.log(`--> fs.readFile with JSON.parse:  `, JSON.parse(data))
      let obj = JSON.parse(data);
      res.json(obj);
      })
    });
  
  // CREATE NEW NOTE
  app.post('/api/notes', (req, res) => {
    console.log(`--> request body:  `, req.body);
    console.log(`--> apiDb | 01 | before push:\nLENGTH:  `, apiDb.length, `\n`, apiDb)
    apiDb.push({
      "id": uuid.v4(),
      "title": req.body.title,
      "text": req.body.text
    })
    console.log(`--> apiDb | 02 | after push:\nLENGTH:  `, apiDb.length, `\n`, apiDb)
    fs.writeFile('./Develop/db/db.json', JSON.stringify(apiDb, undefined, 4), (err) => {
        if (err) {
          console.log(`Error writing file: ${err}`);
          res.send(500)
        } else {
          console.log(`DATA SAVED SUCCESSFULLY`)
          res.sendStatus(200)
        }
    });
    // --------------
    // fs.readFile('./Develop/db/db.json', 'utf8', (err, data) => {
    //   if (err) {
    //     console.log(`Error while attempting to read file -------->\n${err}`)
    //   } else {
    //       apiDb.push({
    //         "id": uuid.v4(),
    //         "title": req.body.title,
    //         "text": req.body.text
    //       })
    //       fs.writeFile('./Develop/db/db.json', JSON.stringify(apiDb, undefined, 4), (err) => {
    //           if (err) {
    //             console.log(`Error writing file: ${err}`);
    //             res.send(500)
    //           } else {
    //             console.log(`DATA SAVED SUCCESSFULLY`)
    //             res.sendStatus(200)
    //           }
    //       });
    //   }
    // });
    // -------------
  });

  // DELETE NOTE
  app.delete(`/api/notes/:id`, (req, res) => {
    console.log(`--> DELETE --> PRE-READ --> request body:  `, req.body);
    console.log(`--> DELETE --> PRE-READ --> request body.id`, req.body.id)
    fs.readFile('./Develop/db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.log(`Error while attempting to read file -------->\n${err}`)
      } else {
        let objData = JSON.parse(data)
        console.log(`--> DELETE --> IN READ --> length of file:  `, objData.length)
        console.log(`--> DELETE --> IN READ --> objectData:  `, objData);
        console.log(`--> DELETE --> IN READ --> req.body.id:  `,  req.body.id)
        console.log(`--> DELETE --> IN READ --> objData[0].id:  ${objData[0].id} <--> req.body.id:  ${req.body.id}`)
        // let delNote = objData.splice([i], 1);
        // fs.writeFile('./Develop/db/db.json', JSON.stringify(objData, undefined, 2), (err) => {
        //   if (err) {
        //     console.log(`Error writing file: `, err);
        //   }
        // })
        // ---------
        console.log(`--> apiDb | 03 | before deletion:\nLENGTH:  `, apiDb.length, `\n`, apiDb)
        for (let i = 0; i < objData.length; i++) {
          
          if (objData[i].id === req.body.id) {
            console.log(`--> DELETE --> IN READ --> IN LOOP --> INDEX POSITION:  `, [i])
            console.log(`--> DELETE --> IN READ --> IN LOOP --> req.body.id:  `, req.body.id);
            console.log(`--> DELETE --> IN READ --> IN LOOP --> objData[i].id:  `, objData[i].id);
            console.log(`--> TYPES:\n  - apiDb:  ${typeof apiDb}\n  - objData:  ${typeof objData}`);
            console.log(`--> objData | 01 | before splice:  `, objData)
            const delNote = objData.splice([i], 1);
            console.log(`--> objData | -- | delNote value:  `, delNote)
            console.log(`--> objData | 02 | after splice:  `, objData)
            fs.writeFile('./Develop/db/db.json', JSON.stringify(objData, undefined, 2), (err) => {
              console.log(`--> apiDb | 04 | after deletion:\nLENGTH:  `, apiDb.length, `\n`, apiDb)
              if (err) {
                console.log(`Error writing file: ${err}`);
                res.send(500)
              } else {
                console.log(`DATA DELETED SUCCESSFULLY`)
                console.log(`--> apiDb | 05 | after deletion, success path:\nLENGTH:  `, apiDb.length, `\n`, apiDb)
                res.sendStatus(200)
              }
            })
          }
            // -------
        
           // console.log = console.log(`--> DELETE --> IN READ --> IN LOOP --> FINAL ARRAY:  `, objData)
          
        }
        // res.sendStatus(200)
      }
    });
  });
}
