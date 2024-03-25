const mongoose = require('mongoose');

const PatientSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please enter the first name"],
        },
        lastName: {
            type: String,
            required: [true, "Please enter the last name"],
        },
        id: {
            type: Number,
            required: [true, "Please enter the Id number"],
        },
        city: {
            type: String,
            required: [true, "Please enter the city name"],
        },
        street: {
            type: String,
            required: [true, "Please enter the street name"],
        },
        streetNum: {
            type: Number ,
            required: [true, "Please enter the street number"],
        },
        bDay: {
            type: Date,
            required: [true, "Please enter the birth day"],
        },
        telephone: {
            type: Number ,
            required: [true, "Please enter the telephone"],
        },
        mobile: {
            type: Number ,
            required: [true, "Please enter the mobile number"],
        },
        image: {
            type: String,
            required: false,
        },
       
    }

);

const Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient;