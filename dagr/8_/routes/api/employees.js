const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const data = {};
data.employees = require('../../data/employees.json');

router.route('/')
    .get((req, res) => {
        res.json(data.employees);
    })
    .post((req, res) => {
        console.log("kontool");
        res.json({
            "id": req.body.id,
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        });
        newData = {};
        newData['id'] = req.body.id;
        newData['firstname'] = req.body.firstname;
        newData['lastname'] = req.body.lastname;
        data.employees.push(newData);
        const jsonString = JSON.stringify(data.employees, null, 4);
        // console.log(jsonString);
        fs.writeFile(path.join(__dirname, '..', '..', 'data', 'employees.json'), jsonString, (err) => {
            if (err) throw err;
        });
    })
    .put((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        });
    })
    .delete((req, res) => {
        res.json({ "id": req.body.id });
        data.employees = data.employees.filter(nama => nama.id !== req.body.id);
        console.log(data.employees);
        fs.writeFile(path.join(__dirname, '..', '..', 'data', 'employees.json'), 
            JSON.stringify(data.employees, null, 4), 
            (err) => {
                if (err) throw err;
        });
    });

router.route('/:id')
    .get((req, res) => {
        res.json({ "id":req.params.id });
    });

module.exports = router;