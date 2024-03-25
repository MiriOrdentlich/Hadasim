const express = require('express');
const mongoose = require('mongoose');
const CovidData=  require('../models/CovidData.js')
const router = express.Router();
const {getCovidDatas, getCovidData, addCovidData,
    updatedCovidData, deletedCovidData} = require('../controllers/covidDataController.jsx');


router.get('/', getCovidDatas);

router.get('/:id', getCovidData);

router.post('/', addCovidData);

router.put('/:id', updatedCovidData);

router.delete('/:id', deletedCovidData);

module.exports = router;