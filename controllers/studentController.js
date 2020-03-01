const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Student = mongoose.model('Student');

router.get('/', (req, res) => {
    res.render("student/addUpdate", {
        viewTitle: "Insert Student"
    });
});

router.post('/', (req, res) => {
    if(req.body._id == ''){
        insertData(req, res);
    }       
    else{
        updateData(req, res);
    }
});

function insertData(req, res){
    var student = new Student();
    student.firstName = req.body.firstName;
    student.lastName = req.body.lastName;
    student.studentID = req.body.studentID;
    student.email = req.body.email;
    student.mobile = req.body.mobile;
    student.save((err, doc) => {
        if(!err)
            res.redirect('student/list');
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("student/addUpdate", {
                    viewTitle: "Insert Student",
                    student: req.body
                });
            }
            else
                console.log('Insert Failed : ' + err);
        }
    });
}

function updateData(req, res){
    Student.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect('student/list');
        }
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("student/addUpdate", {
                    viewTitle: "Update Student",
                    student: req.body
                });
            }
            else{
                console.log("Error while Updating the Record : ", err);
            }
        }
    });
}

router.get('/list', (req, res) => {
    Student.find((err, docs) => {
        if(!err){
            res.render("student/list", {
                list: docs
            });
        }
        else{
            console.log("Error in retrieving Student List : " + err);
        }
    });
});

function handleValidationError(err, body){
    for(field in  err.errors){
        switch(err.errors[field].path){
            case 'firstName':
                body['firstNameError'] = err.errors[field].message;
                break;
            case 'lastName':
                body['lastNameError'] = err.errors[field].message;
                break;
            case 'studentID':
                body['studentIDError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
};

router.get('/:id', (req, res) => {
    Student.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render("student/addUpdate", {
                viewTitle: "Update Student",
                student: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Student.findOneAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.redirect('/student/list');
        }
        else{
            console.log("Error during Deleting Student Record :", err);
        }
    });
});

module.exports = router;