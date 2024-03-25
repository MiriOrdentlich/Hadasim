const express = require('express');
const mongoose = require('mongoose');
const Patient=  require('../models/patient.js')
const router = express.Router();
const {getPatient, getPatients,addPatient,
    updatePatient, deletePatient } = require('../controllers/patientController.jsx');


router.get('/', getPatients);

router.get('/:id', getPatient);

router.post('/', addPatient);

router.put('/:id', updatePatient);

router.delete('/:id', deletePatient);

module.exports = router;