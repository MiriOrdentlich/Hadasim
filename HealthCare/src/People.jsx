import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./styles.css"
import TopDetails from './TopDetails'
import axios from 'axios';
import { useState, useEffect } from 'react';
import {sendDataToServer, deleteData , updateDetails} from './functions'


function People(props) {
  const { person, isReadOnly } = props;
  const [visibility, setVisibility] = useState('visible');
  const [CovidDataList, setCovidDataList] = useState([]);
  const [topDetailsData, setTopDetailsData] = useState({
    firstName: person.firstName,
    lastName: person.lastName,
    id: person.id
  });
  const handleTopDetailsChange = (field, value) => {
    setTopDetailsData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };
// Default values for an empty person object
const {
    city = '',
    street = '',
    streetNum = '',
    bDay = '',
    telephone = '',
    mobile = '',
   
  } = person || {};

  // State variables for form fields
  const [cityValue, setCityValue] = useState(city);
  const [streetValue, setStreetValue] = useState(street);
  const [streetNumValue, setStreetNumValue] = useState(streetNum);
  const [birthDayValue, setBirthDayValue] = useState(bDay);
  const [telephoneValue, setTelephoneValue] = useState(telephone);
  const [mobileValue, setMobileValue] = useState(mobile);
    
  const poRDate = CovidDataList?.pRDate ? new Date(CovidDataList.pRDate).toLocaleDateString('en-CA') : '';
  const reDay = CovidDataList?.rDay ? new Date(CovidDataList.rDay).toLocaleDateString('en-CA') : '';
  const vaccinationDate1 = CovidDataList?.vaccinationDate1 ? new Date(CovidDataList.vaccinationDate1).toLocaleDateString('en-CA') : '';
  const vaccinationDate2 = CovidDataList?.vaccinationDate2 ? new Date(CovidDataList.vaccinationDate2).toLocaleDateString('en-CA') : '';
  const vaccinationDate3 = CovidDataList?.vaccinationDate3 ? new Date(CovidDataList.vaccinationDate3).toLocaleDateString('en-CA') : '';
  const vaccinationDate4 = CovidDataList?.vaccinationDate4 ? new Date(CovidDataList.vaccinationDate4).toLocaleDateString('en-CA') : '';

  const [poRDateValue, setPoRDateValue] = useState('');
  const [reDayValue, setReDayValue] = useState('');
  const [manufacturerName1Value, setManufacturerName1Value] = useState('');
  const [vaccinationDate1Value, setVaccinationDate1Value] = useState('');
  const [manufacturerName2Value, setManufacturerName2Value] = useState('');
  const [vaccinationDate2Value, setVaccinationDate2Value] = useState('');
  const [manufacturerName3Value, setManufacturerName3Value] = useState('');
  const [vaccinationDate3Value, setVaccinationDate3Value] = useState('');
  const [manufacturerName4Value, setManufacturerName4Value] = useState('');
  const [vaccinationDate4Value, setVaccinationDate4Value] = useState('');

  // Function to handle changes in input fields
  const handleInputChange1 = (e) => {
    const { id, value } = e.target;
    console.log("handleInputChange - people");
    switch (id) {
      case 'city':
        setCityValue(value);
        break;
      case 'street':
        setStreetValue(value);
        break;
      case 'streetNum':
        setStreetNumValue(value);
        break;
      case 'bDay':
        setBirthDayValue(value);
        break;
      case 'telephone':
        setTelephoneValue(value);
        break;
      case 'mobile':
        setMobileValue(value);
        break;
        
      default:
        break;
    }
  };
  
  const handleInputChange2 = (e) => {
    const { id, value } = e.target;
    console.log("handleInputChange- corona");
    console.log(id);
    switch (id) {
      case 'pRDate':
        setPoRDateValue(value);
        break;
      case 'rDay':
        setReDayValue(value);
        break;
      case 'manufacturerName1':
        setManufacturerName1Value(value);
        break;
      case 'vaccinationDate1':
        setVaccinationDate1Value(value);
        break;
      case 'manufacturerName2':
        setManufacturerName2Value(value);
        break;
      case 'vaccinationDate2':
        setVaccinationDate2Value(value);
        break;
      case 'manufacturerName3':
        setManufacturerName3Value(value);
        break;
      case 'vaccinationDate3':
        setVaccinationDate3Value(value);
        break;
      case 'manufacturerName4':
        setManufacturerName4Value(value);
        break;
      case 'vaccinationDate4':
        setVaccinationDate4Value(value);
        break;
      default:
        break;
    }
  };
//the necessary data after the changes
const collectFormDataPatient = () => {
  console.log("collectFormDataPatient");
  return {
      city: cityValue,
      street: streetValue,
      streetNum: streetNumValue,
      bDay: birthDayValue,
      telephone: telephoneValue,
      mobile: mobileValue,
  };
};

//the covid data after the changes
const collectFormDataCovid = () => {
  console.log("collectFormDataCovid");
    return {
      id: CovidDataList.id,
      pRDate: poRDateValue,
      rDay: reDayValue,
      manufacturerName1: manufacturerName1Value,
      vaccinationDate1: vaccinationDate1Value,
      manufacturerName2: manufacturerName2Value,
      vaccinationDate2: vaccinationDate2Value,
      manufacturerName3: manufacturerName3Value,
      vaccinationDate3: vaccinationDate3Value,
      manufacturerName4: manufacturerName4Value,
      vaccinationDate4: vaccinationDate4Value,
    };
};

//the necessary data before the changes
const beforeChangeDataPatient =() => {
  console.log("beforeChangeDataPatient");
  return {
      id: person.id,
      firstName: person.firstName,
      lastName: person.lastName,
      city: city,
      street: street,
      streetNum: streetNum,
      bDay: bDay,
      telephone: telephone,
      mobile: mobile   
  }
};

const beforeChangeDataCovid =() => {
  console.log("beforeChangeDataCovid");
  return {
    id: CovidDataList.id,
    pRDate: poRDate,
    rDay: reDay,
    manufacturerName1: CovidDataList.manufacturerName1,
    vaccinationDate1: vaccinationDate1,
    manufacturerName2: CovidDataList.manufacturerName2,
    vaccinationDate2: vaccinationDate2,
    manufacturerName3: CovidDataList.manufacturerName3,
    vaccinationDate3: vaccinationDate3,
    manufacturerName4: CovidDataList.manufacturerName4,
    vaccinationDate4: vaccinationDate4,
  }
};

const saveBtn = async (event) => {
  const formPatient = collectFormDataPatient(); 
  const formCovid = collectFormDataCovid(); 
  const patientOldData = beforeChangeDataPatient();
  const covidOldData= beforeChangeDataCovid();
  let errorPatient = '';
  let errorCovid = '';
  const formTopDetails = {
      ...topDetailsData // Data from TopDetails component
    };

  if(props.isAdd)
  {
    console.log("save button");
    errorPatient = await sendDataToServer(formPatient,formTopDetails,formCovid);
  }
  else
  {
    if(props.isEdit)
    {
      console.log("edit btn");
      errorCovid = await updateDetails(formPatient,formTopDetails,formCovid,patientOldData,covidOldData,CovidDataList.id);
      //CovidDataList.id will tell if i need to create post for the covid
      //if there is no covid data at all
      //patientOldData is to know if there were any changes
    
    }
    else{
      console.log("this shouldnt happen, the edit viability is wrong")
    }

    
  }
  if (errorPatient || errorCovid) {
    alert(`Error: ${errorPatient || errorCovid}`);
    event.preventDefault();
  }
  // else
  // {
  //   setErrorMessage('');
  // }
  
};

const deleteBtn = () => {
  console.log("delete button");
  console.log(CovidDataList.id);
  console.log(props.person.id);
  if(CovidDataList.id)
  {
    console.log("has covid data");
    deleteData(CovidDataList.id, 1);
  }
  else{
    console.log("dont have covid data");
    deleteData(props.person.id, 0);
  }
};
 
  const birthDay = props.person.bDay ? new Date(props.person.bDay).toLocaleDateString('en-CA') : '';

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/coviddata/${props.person.id}`);
      console.log(response.data);
      if (response.data) {
        setCovidDataList(response.data);
        setVisibility('visible');
      } else {
        // If no vaccination data found, set an empty array
        setCovidDataList([]);
        if(props.isShow)
        {
          setVisibility('none');

        }
      }(response.data);
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    
    if(!props.isAdd)
    {
      fetchData();

    }
  }, [props.person.id]);

  const shouldDisplayField = (value) => {
    if(props.isShow && value || !props.isShow)
      {return 'block';
  } else {
    return 'none';
    }
  };

  const shouldDisplayHeader = () => {
    // Check if any of the fields are visible
    const fields = [
      CovidDataList.manufacturerName1,
      CovidDataList.manufacturerName2,
      CovidDataList.manufacturerName3,
      CovidDataList.manufacturerName4,
      vaccinationDate1,
      vaccinationDate2,
      vaccinationDate3,
      vaccinationDate4
    ];
    
    for (const field of fields) {
      if (shouldDisplayField(field) === 'block') {
        return true;
      }
    }
  
    return false; // If no field is visible, return false
  };

  
  return (
    <>
        <form className="new-person-form">
        <div className="form-row">
    
          <TopDetails person={person} isReadOnly= {isReadOnly} 
          onTopDetailsChange={handleTopDetailsChange} // Pass down change handler
          isAdd={props.isAdd}
          />
          <h1>Adress</h1>
          <label>City
          <input type="text" id="city" defaultValue={city} readOnly={isReadOnly} onChange={handleInputChange1}/></label><br/>
          <label>Street
          <input type="text" id="street" defaultValue={street} readOnly={isReadOnly} onChange={handleInputChange1}/></label><br/>
          <label>House number
          <input type="number" id="streetNum" defaultValue={streetNum} readOnly={isReadOnly} onChange={handleInputChange1} min="1"/></label><br/>
          <label>Birth Date
          <input type="date" id="bDay" defaultValue={birthDay} readOnly={isReadOnly} onChange={handleInputChange1}/></label><br/>
          <label>Telephone
          <input type="tel" id="telephone" defaultValue={telephone} readOnly={isReadOnly} onChange={handleInputChange1}  minLength="9" maxLength="12"/></label><br/>
          <label>Mobile
          <input type="tel" id="mobile" defaultValue={mobile} readOnly={isReadOnly} onChange={handleInputChange1} minLength="9" maxLength="12"/></label><br/> 
          
          <div style={{ display: visibility }}>
          <h2 style={{ display: shouldDisplayField(poRDate) }}>Corona Info</h2>
          <label style={{ display: shouldDisplayField(poRDate) }}>Positive Result Date
          <input type="date" id="pRDate" defaultValue={poRDate} readOnly={isReadOnly} onChange={handleInputChange2}/></label><br/>
          <label style={{ display: reDay && poRDate && props.isShow || !props.isShow ? 'block' : 'none' }}>Recovery Date
          <input type="date" id="rDay" defaultValue={reDay} readOnly={isReadOnly} onChange={handleInputChange2}/></label><br/>
          { shouldDisplayHeader() ?  <h3>Vaccination Info</h3> : null}
          <label style={{ display: shouldDisplayField(CovidDataList.manufacturerName1) }}>Manufacturer Name
          <input type="text" id="manufacturerName1"  defaultValue={CovidDataList.manufacturerName1} readOnly={props.isReadOnly} onChange={handleInputChange2}/></label><br/>
          <label style={{ display: shouldDisplayField(vaccinationDate1)}}>Vaccination Date
          <input type="date" id="vaccinationDate1" defaultValue={vaccinationDate1} readOnly={props.isReadOnly} onChange={handleInputChange2}/></label><br/>
          <br/>
          <label style={{ display: shouldDisplayField(CovidDataList.manufacturerName2) }}>Manufacturer Name
          <input type="text" id="manufacturerName2"  defaultValue={CovidDataList.manufacturerName2} readOnly={props.isReadOnly} onChange={handleInputChange2}/></label><br/>
          <label style={{ display: shouldDisplayField(vaccinationDate2)}}>Vaccination Date
          <input type="date" id="vaccinationDate2" defaultValue={vaccinationDate2} readOnly={props.isReadOnly} onChange={handleInputChange2}/></label><br/>
          <br/>
          <label style={{ display: shouldDisplayField(CovidDataList.manufacturerName3) }}>Manufacturer Name
          <input type="text" id="manufacturerName3"  defaultValue={CovidDataList.manufacturerName3} readOnly={props.isReadOnly} onChange={handleInputChange2}/></label><br/>
          <label style={{ display: shouldDisplayField(vaccinationDate3) }}>Vaccination Date
          <input type="date" id="vaccinationDate3" defaultValue={vaccinationDate3} readOnly={props.isReadOnly} onChange={handleInputChange2}/></label><br/>
          <br/>
          <label style={{ display: shouldDisplayField(CovidDataList.manufacturerName4) }}>Manufacturer Name
          <input type="text" id="manufacturerName4"  defaultValue={CovidDataList.manufacturerName4} readOnly={props.isReadOnly} onChange={handleInputChange2}/></label><br/>
          <label style={{ display: shouldDisplayField(vaccinationDate4) }}>Vaccination Date
          <input type="date" id="vaccinationDate4" defaultValue={vaccinationDate4} readOnly={props.isReadOnly} onChange={handleInputChange2}/></label><br/>
          <br/>
          </div>

          </div>
          {props.isShow && <button onClick={deleteBtn}>Delete</button>}
          {!props.isShow &&<button onClick={saveBtn}>Save</button>}
          <br/>
          <br/>

         </form>
          
          </>
  )
}

export default People