require('./models/db');

const express = require('express');
const path = require('path');
const exhandle = require('express-handlebars');
const bodyParser = require('body-parser');

const studentController = require('./controllers/studentController');

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exhandle({extname: 'hbs',  defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');

app.listen(3000, () => {
    console.log('Express server started at port: 3000');
});

app.use('/student', studentController);