import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./styles.css"
import Vaccination from './Vaccination'
import TopDetails from './TopDetails'

function People(props) {
  const [count, setCount] = useState(0)
  const { person, isReadOnly } = props;


// Default values for an empty person object
const {
    city = '',
    street = '',
    streetNum = '',
    bDay = '',
    telephone = '',
    mobile = '',
    pRDate = '',
    rDay = '',
    vaccinationList = [],
  } = person || {};

    // Function to generate unique keys for vaccinations
    const generateKey = (personId, vaccinationIndex) => {
      return `${personId}_${vaccinationIndex}`;
    };

      // Function to create empty Vaccination components
  const createEmptyVaccinations = () => {
    return Array.from({ length: 4 }, (_, index) => ({
      mname: '',
      vDate: '',
    }));
  };
  

  return (
    <>
        <form className="new-person-form">
        <div className="form-row">

          <TopDetails person={person} isReadOnly= {isReadOnly}/>
          <h1>Adress</h1>
          <label>City
          <input type="text" id="city" defaultValue={city} readOnly={isReadOnly}/></label><br/>
          <label>Street
          <input type="text" id="street" defaultValue={street} readOnly={isReadOnly}/></label><br/>
          <label>Number
          <input type="number" id="streetNum" defaultValue={streetNum} readOnly={isReadOnly}/></label><br/>
          <label>Birth Date
          <input type="date" id="bDay" defaultValue={bDay} readOnly={isReadOnly}/></label><br/>
          <label>Telephone
          <input type="tel" id="telephone" defaultValue={telephone} readOnly={isReadOnly}/></label><br/>
          <label>Mobile
          <input type="tel" id="mobile" defaultValue={mobile} readOnly={isReadOnly}/></label>  <br/>  
          
          <h2>Corona Info</h2>
          <label>Positive Result Date
          <input type="date" id="pRDate" defaultValue={pRDate} readOnly={isReadOnly}/></label><br/>
          <label>Recovery Date
          <input type="date" id="rDay" defaultValue={rDay} readOnly={isReadOnly}/></label><br/>
          <h3>Vaccination Info </h3>


        {person &&  person.vaccinationList && person.vaccinationList.length > 0 && (
        person.vaccinationList.map((vaccination, index) => (
            // <div key={generateKey(person.id, index)}>
            <div key={index} >
            <Vaccination vaccination={vaccination} isReadOnly={isReadOnly} />
            </div>
        ))
        )}
        {/* for an empty person */}
        {vaccinationList.length === 0 && (
            createEmptyVaccinations().map((emptyVaccination, index) => (
              <div key={`empty_${index}`}>
                <Vaccination vaccination={emptyVaccination} isReadOnly={isReadOnly} />
              </div>
            ))
          )}
          
          </div>
         </form>
          
          </>
  )
}

export default People