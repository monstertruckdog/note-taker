const express = require('express');
//const routes = require('./Develop/routes');
const path = require ('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(routes);

//require('./Develop/routes/apiRoutes')(app);
//require('./Develop/routes/htmlRoutes')(app);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`)
});