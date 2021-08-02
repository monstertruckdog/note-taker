const express = require('express');
const path = require ('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000
const router = express.Router()
const staticDirectoryPath = express.static(path.join(__dirname, './Develop/public'))
//const staticDirectoryPath = express.static(path.join(__dirname, 'public', ));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//app.use(routes);
app.use(staticDirectoryPath);

require('./Develop/routes/apiRoutes')(app);
require('./Develop/routes/htmlRoutes')(app);

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`)
});