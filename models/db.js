const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/StudentDB', {useNewUrlParser: true}, (err) => {
    if(!err) {console.log('DB Connection Successful!')}
    else{console.log('DB Connection Failed! + ' + err)}
});

require('./student.model');