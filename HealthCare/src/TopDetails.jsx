import "./styles.css"
import People from './People';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';




export default function TopDetails(props)
{

    const handleInput = (e) => {
        console.log(e.target.value)


    }

    return (
        <>
         <div className="top-details-container">
            <div className="top-details" >
                <label>First Name
                <input type="text" onChange={handleInput} id="fname" defaultValue={props.person.fname} readOnly={props.isReadOnly}/></label> <br/>
                <label>Last Name
                <input type="text" onChange={handleInput} id="lname" defaultValue={props.person.lname} readOnly={props.isReadOnly}/></label> <br/>
                <label>Id
                <input type="number" onChange={handleInput} id="id" defaultValue={props.person.id} readOnly={props.isReadOnly}/></label> <br/>

            </div>
        </div>

        </>
    )
}

