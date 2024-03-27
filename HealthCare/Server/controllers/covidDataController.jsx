const CovidData=  require('../models/CovidData')

//Get all the coviddatas
const getCovidDatas = async (req, res) => {
    try {
        // Create the Patient object
        const covidDatas  = await CovidData.find({});
        res.status(200).json(covidDatas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get a single covid data
const getCovidData = async (req, res) => {
    try {
        const {id} = req.params;
        //findOne({name : value}) to search
        const covidData = await CovidData.findOne({ id: id });
        res.status(200).json(covidData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Add new covid data
const addCovidData = async (req, res) => {
    try {
        console.log("fhhiiiiiiiiiijhj", req.body);
        // Create the Patient object
        const covidData  = await CovidData.create(req.body);
        res.status(200).json(covidData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Update covid data
const updatedCovidData = async (req, res) => {
    try {
        //console.log("fhhiiiiiiiiiijhj", req.body);
        const {id} = req.params;
        const coviddata = await CovidData.findOneAndUpdate({ id: id }, req.body, { new: true });
        if(!coviddata)
        {
            res.status(404).json({ message: "Covid data not found" });

        }
        const updatedcoviddata = await CovidData.findOne({ id: id });
        res.status(200).json(updatedcoviddata);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Delete covid data
const deletedCovidData = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedcoviddata  = await CovidData.findOneAndDelete({ id: id });
        if(!deletedcoviddata )
        {
            res.status(404).json({ message: "Covid Data not found" });

        }
        res.status(200).json({ message: "Covid Data deleted successfully" });
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCovidDatas,
    getCovidData,
    addCovidData,
    updatedCovidData,
    deletedCovidData
}
