const mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: '*required.'
    },
    lastName:{
        type: String,
        required: '*required.'
    },
    studentID:{
        type: String,
        required: '*required.'
    },
    email:{
        type: String
    },
    mobile:{
        type: String
    }
});

studentSchema.path('email').validate((val) => {
    regexEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    return regexEmail.test(val);
}, 'Invalid email!');

mongoose.model('Student', studentSchema);