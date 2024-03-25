const Patient=  require('../models/patient')

//Get all the patients
const getPatients = async (req, res) => {
    try {
        // Create the Patient object
        const patients = await Patient.find({});
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get a single patient
const getPatient = async (req, res) => {
    try {
        const {id} = req.params;
        const patient = await Patient.findOne({ id: id });
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Add a new patient
const addPatient = async (req, res) => {
    try {
        // Create the Patient object
        const patient = await Patient.create(req.body);
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Update a patient
const updatePatient =  async (req, res) => {
    try {
        const {id} = req.params;
        const patient = await Patient.findOneAndUpdate({ id: id }, req.body, { new: true });
        if(!patient)
        {
            res.status(404).json({ message: "Patient not found" });

        }
        const updatedPatient = await Patient.findOne({ id: id });
        res.status(200).json(updatedPatient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Delete a patient
const deletePatient = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedPatient  = await Patient.findOneAndDelete({ id: id });
        if(!deletedPatient )
        {
            res.status(404).json({ message: "Patient not found" });

        }
        res.status(200).json({ message: "Patient deleted successfully" });
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPatient,
    getPatients,
    addPatient,
    updatePatient,
    deletePatient
}