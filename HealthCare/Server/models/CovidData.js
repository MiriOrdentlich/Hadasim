const mongoose = require('mongoose');

const CovidDataSchema = mongoose.Schema({
    id: {
        type: Number,
        required: [true, "Please enter the Id number"],
    },
    pRDate: {
        type: Date,
        required: false
    },
    rDay: {
        type: Date,
        required: false
    },
    manufacturerName1: {
        type: String,
        required: false,
    },
    vaccinationDate1: {
        type: Date,
        required: false,
    },
    manufacturerName2: {
        type: String,
        required: false,
    },
    vaccinationDate2: {
        type: Date,
        required: false,
    },
    manufacturerName3: {
        type: String,
        required: false,
    },
    vaccinationDate3: {
        type: Date,
        required: false,
    },
    manufacturerName4: {
        type: String,
        required: false,
    },
    vaccinationDate4: {
        type: Date,
        required: false,
    },
});


const CovidData = mongoose.model("CovidData", CovidDataSchema);

module.exports = CovidData;