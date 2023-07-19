const Employee = require("../model/Employee");
const mongoose = require('mongoose');

const getAllEmployees = async (req, res) => {
    res.json(await Employee.find({}));
};

const createNewEmployee = async (req, res) => {
    if (!req.body.firstname || !req.body.lastname)
        return res.status(400).json({ message: "First or last names are required" });

    await Employee.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    });

    res.json(await Employee.find({}));
};

const updateEmployee = async (req, res) => {
    if (!req.body || !req.body.id || !mongoose.Types.ObjectId.isValid(req.body.id))
        return res.status(400).json({ 'message': 'Invalid ID provided' });
    const foundEmployee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!foundEmployee)
        return res.status(400).json({ 'message': `Employee ID ${req.body.id} not found` });
    if (req.body.firstname) foundEmployee.firstname = req.body.firstname;
    if (req.body.lastname) foundEmployee.lastname = req.body.lastname;
    await foundEmployee.save();
    res.json(await Employee.find({}));
};

const deleteEmployee = async (req, res) => {
    if (!req.body || !req.body.id || !mongoose.Types.ObjectId.isValid(req.body.id))
        return res.status(400).json({ 'message': 'Invalid ID provided' });
    if (!(await Employee.findOne({ _id: req.body.id }).exec()))
        return res.status(400).json({ 'message': `Employee ID ${req.body.id} not found` });
    await Employee.deleteOne({ _id: req.body.id });
    res.json(await Employee.find({}));
};

const getEmployee = async (req, res) => {
    if (!req.params || !req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).json({ 'message': 'Invalid ID provided' });
    foundEmployee = await Employee.findOne({ _id: req.params.id }).exec();
    if (!foundEmployee) {
        return res.status(400).json({ message: `Employee ID ${req.body.id} not found` });
    }
    res.json(foundEmployee);
};

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
};
