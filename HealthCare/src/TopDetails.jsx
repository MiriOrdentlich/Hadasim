import "./styles.css"
import People from './People';
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';




export default function TopDetails({ person, isReadOnly, onTopDetailsChange , isAdd})
{
    const [firstName, setFirstName] = useState(person.firstName);
    const [lastName, setLastName] = useState(person.lastName);
    const [id, setId] = useState(person.id);
    const [isIdEdible, setIsIdEdible] = useState(isAdd ?  false: 'readonly'); //make the id edible if on add and not edible anywhere else

    // Function to handle changes in input fields
    const handleInputChange = (e) => {
        console.log("handleInputChange - top");
        const { id, value } = e.target;
        onTopDetailsChange(id, value);
    };
    TopDetails.collectFormDataTopDetails = () => {
        return {
            id,
            firstName,
            lastName,
        };
    };
    useEffect(() => {
        setFirstName(person.firstName || '');
        setLastName(person.lastName || '');
        setId(person.id || '');
    }, [person]);

    return (
        <>
         <div className="top-details-container">
            <div className="top-details" >
                <label>First Name
                <input type="text" onChange={handleInputChange} id="firstName" defaultValue={person.firstName} readOnly={isReadOnly}/></label> <br/>
                <label>Last Name
                <input type="text" onChange={handleInputChange} id="lastName" defaultValue={person.lastName} readOnly={isReadOnly}/></label> <br/>
                <label>Id
                <input type="number" onChange={handleInputChange} id="id" defaultValue={person.id} readOnly={isIdEdible} pattern="[0-9]{9}"/></label> <br/>

            </div>
        </div>

        </>
    )
}

