const fs = require('fs');
const path = require('path');
const data = {};
data.employees = require('../model/employees.json');

const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

const createNewEmployee = (req, res) => {
    res.json({
        "id": req.body.id,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    });
    // newData = {};
    // newData['id'] = req.body.id;
    // newData['firstname'] = req.body.firstname;
    // newData['lastname'] = req.body.lastname;
    // data.employees.push(newData);
    // const jsonString = JSON.stringify(data.employees, null, 4);
    // // console.log(jsonString);
    // fs.writeFile(path.join(__dirname, '..', '..', 'data', 'employees.json'), jsonString, (err) => {
    //     if (err) throw err;
    // });
}

const updateEmployee = (req, res) => {
    res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    });
}

const deletEmployee = (req, res) => {
    res.json({ "id": req.body.id });
    // data.employees = data.employees.filter(nama => nama.id !== req.body.id);
    // console.log(data.employees);
    // fs.writeFile(path.join(__dirname, '..', '..', 'data', 'employees.json'), 
    //     JSON.stringify(data.employees, null, 4), 
    //     (err) => {
    //         if (err) throw err;
    // });
}

const getEmployee = (req, res) => {
    res.json({ "id":req.params.id });
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deletEmployee,
    getEmployee
}