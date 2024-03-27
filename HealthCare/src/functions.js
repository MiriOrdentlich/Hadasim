import axios from 'axios';
import People from './People';
import TopDetails from './TopDetails';

  export const isPatientDatatValidAdd = (combinedPatient) => {
    let isValid = false;  
    let error = false;  
    console.log("isPatientDatatValidAdd");
    console.log(combinedPatient);
    const { firstName, lastName, id, city, street, streetNum, bDay, telephone, mobile } = combinedPatient;
    
    // Check if any field is empty or invalid
    for (const key in combinedPatient) {
      if (!combinedPatient[key]) {
        error = `Please fill in the ${key} feild` ;
          return [false ,error];
      }
    }
    
    if(id.length < 9)
    {
      error = 'id is small' ;
          return [false ,error];
    }
    const streetNumValue = parseInt(streetNum);
    if(streetNumValue < 1)
    {
      error = 'House number is impossible' ;
          return [false ,error];
    }
    if(telephone.length !=12 && telephone.length !=10)
    {
      error = 'The telephone is not correct' ;
          return [false ,error];
    }
    if(mobile.length != 12 && telephone.length !=10)
    {
      error = 'The mobile is not correct' ;
          return [false ,error];
    }
    isValid = true;
    return [isValid , false];
  };

  export const isPatientDatatValidEdit = (combinedPatient ,patientOldData) => 
  {
    const differingFields = {};
    let hasNewValue = false;
    let isValid = false;  
    let error = false;  
    console.log("isPatientDatatValidEdit");

    //check if there is a difference - new data
    for (const key in combinedPatient) {
      if (combinedPatient[key] !== patientOldData[key]) {
          differingFields[key] = combinedPatient[key];
          hasNewValue = true;
      }
    }
    const { firstName, lastName, id, city, street, streetNum, bDay, telephone, mobile } = differingFields;
    console.log(differingFields);
    // Check if any field is empty or invalid
    for (const key in differingFields) {
      if (!differingFields[key]) {
        error = `Please fill in the ${key} feild` ;
          return ['','','',error];
      }
    }
    console.log(streetNum);
    //if any of them wasnt changed if(undefind <9) is always false so its good
    if(streetNum)
    {
      const streetNumValue = parseInt(streetNum);
      console.log('streetNumValue');
      console.log(streetNumValue);
      if(streetNumValue < 1)
      {
        error = 'House number is impossible' ;
        return ['','','',error];
      }
    }
    if(telephone)
    {
      if (telephone.length !== 12 && telephone.length !== 10) 
        {
        error = 'The telephone is not correct' ;
            return ['','','',error];
      }
    }
    
    if(mobile)
    {
      if (mobile.length !== 12 && mobile.length !== 10) 
        {
        error = 'The mobile is not correct' ;
            return ['','','',error];
      }
    }
    
    
    console.log(differingFields);
    isValid = true;
    return [isValid , hasNewValue ,differingFields , false];
  };

//check if the values are valid and also returns only the one that changed
  export const isCovidDatatValid = (formCovid) =>
    {
      let error = false;  
      const valuableData = {};
        const pairs = [
            ['manufacturerName1', 'vaccinationDate1'],
            ['manufacturerName2', 'vaccinationDate2'],
            ['manufacturerName3', 'vaccinationDate3'],
            ['manufacturerName4', 'vaccinationDate4']
          ];
          const {pRDate , rDay} = formCovid;

          for (const [manufacturerKey, vaccinationKey] of pairs) 
          {
            const manufacturerValue = formCovid[manufacturerKey];
            const vaccinationValue = formCovid[vaccinationKey];
            if ((manufacturerValue && !vaccinationValue) || (!manufacturerValue && vaccinationValue)) 
            {
                error = 'Please provide Name and date for the vaccination';
                return [false ,valuableData , error]; // One of the pair is filled while the other is not
            }
            else //All pairs are either both filled or both empty
            { 
              if (manufacturerValue) {
                valuableData[manufacturerKey] = manufacturerValue;
                valuableData[vaccinationKey] = vaccinationValue;
                console.log('manufacturer and vaccination are valid' +  manufacturerValue + vaccinationValue);
              }
            }
          }
          if (pRDate) {
            valuableData.pRDate = pRDate;
            console.log('pRDate valid' +  pRDate);
          }
          if (rDay) {
            valuableData.rDay = rDay;
            console.log('rDay valid' +  rDay);
          }
          return [true, valuableData , error]; //the values that changed- has a value
    };

  // Function to Add data
  export const sendDataToServer = async (formPatient,formTopDetails,formCovid ) => {
    console.log("sendDataToServer");
    const { id } = formTopDetails;
    try {
        // Combine data from both components
        const combinedPatient = {
            ...formTopDetails,
            ...formPatient
        };
        const [isValid , errorPatient] = isPatientDatatValidAdd(combinedPatient)
        if(errorPatient)
        {
          console.log(errorPatient);
          return errorPatient;
        }
        const [isCovidValid, valuableCovidData, errorCovid] = isCovidDatatValid(formCovid);
        if(errorCovid)
        {
          console.log(errorCovid);
          return errorCovid;
        }
        
        const combinedCovid = {
          id,
          ...valuableCovidData
      };
        if(isValid)
        {
            const [patientResponse, covidResponse] = await Promise.all([
              axios.post('http://localhost:3000/api/patients', combinedPatient),
              isCovidValid && Object.keys(valuableCovidData).length !== 0 ?
              axios.post('http://localhost:3000/api/coviddata', combinedCovid) : null
          ]);

          console.log('Patient data sent to server:', patientResponse.data);
          if (covidResponse) {
              console.log('Covid data sent to server:', covidResponse.data);
          }
        }
      
    } catch (error) {
      console.error('Error sending data to server:', error);
      return error; // Rethrow the error for the calling code to handle
    }
  };

  export const updateDetails = async (formPatient,formTopDetails,formCovid,patientOldData,covidId ) => {
    console.log("updateDetails");
    const { id } = formTopDetails;
    try {
       
       // Combine data from both components
       const combinedPatient = {
        ...formTopDetails,
        ...formPatient
        };
       const [isValid , hasNewValue ,valuablePatientData, errorPatient] = isPatientDatatValidEdit(combinedPatient, patientOldData)
       if(errorPatient)
       {
         return errorPatient;
       }

       const [isCovidValid, valuableCovidData, errorCovid] = isCovidDatatValid(formCovid);
       if(errorCovid)
       {
         return errorCovid;
       }
      
        const combinedCovid = {
          id,
          ...valuableCovidData
      };
        

        if(isValid) //there are no mistakes in the important details
        {
          
          console.log("to");
          const requests = [];

          if (hasNewValue) {
                requests.push(axios.put(`http://localhost:3000/api/patients/${id}`, valuablePatientData));
            }

            if (isCovidValid && Object.keys(valuableCovidData).length !== 0) {
                if (covidId) {
                    requests.push(axios.put(`http://localhost:3000/api/coviddata/${id}`, valuableCovidData));
                } else {
                    requests.push(axios.post('http://localhost:3000/api/coviddata', combinedCovid));
                }
            }

            // Make both HTTP requests concurrently
            const responses = await Promise.all(requests);
            responses.forEach(response => {
                console.log('Data sent to server:', response.data);
            });
        }
    } catch (error) {
      console.error('Error sending data to server:', error);
      return error; // Rethrow the error for the calling code to handle
    }
  };

  export const deleteData = async (id , num) => {
    try {
      console.log("deleteData");
      const response1 = await axios.delete(`http://localhost:3000/api/patients/${id}`);
      console.log('Data sent to server:', response1.data);
      if(num === 1)
      {
        console.log("delete covid Data");
        const response2 = await axios.delete(`http://localhost:3000/api/coviddata/${id}`);
        console.log('Data sent to server:', response2.data);
      }
           
    }
    catch (error) {
      console.error('Error sending data to server:', error);
      throw error; // Rethrow the error for the calling code to handle
    }
  }

  export default sendDataToServer;
