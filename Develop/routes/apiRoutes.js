const apiDb = require('../db/db.json')
const fs = require('fs');
const uuid = require('uuid');

module.exports = (app) => {
  // READ NOTES
  app.get('/api/notes', (req, res) => {
    fs.readFile('./Develop/db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.log(`Error reading file: ${err}`);
        res.sendStatus(500)
      } else {
        let obj = JSON.parse(data);
        res.json(obj);
      }
    })
  });
  
  // CREATE NEW NOTE
  app.post('/api/notes', (req, res) => {
    apiDb.push({
      "id": uuid.v4(),
      "title": req.body.title,
      "text": req.body.text
    })
    fs.writeFile('./Develop/db/db.json', JSON.stringify(apiDb, undefined, 4), (err) => {
        if (err) {
          console.log(`Error writing file: ${err}`);
          res.send(500)
        } else {
          // res.sendStatus(200)
          res.json(apiDb)
        }
    });
  });

  // DELETE NOTE
  app.delete(`/api/notes/:id`, (req, res) => {
    fs.readFile('./Develop/db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.log(`Error reading file: ${err}`);
        res.sendStatus(500)
      } else {
        let objData = JSON.parse(data)
        for (let i = 0; i < objData.length; i++) 
          if (objData[i].id === req.body.id) {
            const delNote = objData.splice([i], 1);
            fs.writeFile('./Develop/db/db.json', JSON.stringify(objData, undefined, 2), (err) => {
              if (err) {
                console.log(`Error writing file: ${err}`);
                res.send(500)
              } else {
                res.sendStatus(200)
              }
            })
          }
      }
    });
  });
}
