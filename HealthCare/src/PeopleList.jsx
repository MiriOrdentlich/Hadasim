import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./styles.css"
import People from './People'
import TopDetails from './TopDetails'


function PeopleList() {
    const generatedList = [
        { id: 1, fname: 'John', lname: 'Doe', city: 'New York', street:'a' ,
        vaccinationList : [
            { mname: "Pfizer", vDate: "2024-03-20" },
            { mname: "Moderna", vDate: "2024-03-15" },
            { mname: "Johnson & Johnson", vDate: "2024-03-10" },
            { mname: "AstraZeneca", vDate: "2024-03-05" }
          ] },
        { id: 2, fname: 'Jane', lname: 'Smith', city: 'Los Angeles', street:'a' , 
        vaccinationList : [
            { mname: "Pfizer", vDate: "2024-03-20" },
            { mname: "Pfizer", vDate: "2024-03-15" },
            { mname: "Pfizer", vDate: "2024-03-10" },
            { mname: "Pfizer", vDate: "2024-03-05" }
          ]},
        { id: 3, fname: 'Alice', lname: 'Johnson', city: 'Chicago' , street:'a' , 
        vaccinationList : [
            { mname: "Moderna", vDate: "2024-03-20" },
            { mname: "Moderna", vDate: "2024-03-15" },
            { mname: "Moderna", vDate: "2024-03-10" },
            { mname: "Moderna", vDate: "2024-03-05" }
          ]}
      ];
      const [peopleData, setPeopleData] = useState([]);
      const [selectedPersonId, setSelectedPersonId] = useState(null);
      const [readOnlyP, setReadOnlyP] = useState(true);
      const [visibility, setVisibility] = useState(true); //the topdetails component visibility

      const showBtn = (personId) => {
        setSelectedPersonId(personId);
        setVisibility(false); //for the return btn
        setReadOnlyP(true);

      };

      const editBtn = (personId) => {
        setSelectedPersonId(personId);
        setVisibility(false);
        setReadOnlyP(false);

      };

      const deleteBtn = (personId) => {
        //actually deletinngggggggggg
    };

    const addBtn = () => {
        setSelectedPersonId({});
        setReadOnlyP(false);
        setVisibility(false); //for the return btn


        //actually addingggggggggggggggggg
    };

      const returnBtn = () => {
        setSelectedPersonId(null);
        setVisibility(true);
      };

      const saveBtn = () => {
        setSelectedPersonId(null);
        setVisibility(true);
        //actually savinggggggggggggggggggg
      };

  return (
    <>
    <div className="people-list-general">
        <div className="list-Of-people">
            <h1>Hi from peopleList</h1>
            {generatedList.map(person => (
            visibility &&
            <div className="topDetails-list" key={person.id}>
            
            <TopDetails person={person} isReadOnly= {readOnlyP}/>
            <button onClick={() => showBtn(person.id)}>Show Details</button>
            <button onClick={() => editBtn(person.id)}>Edit Details</button>
            <button onClick={() => deleteBtn(person.id)}>Delete</button>

            </div>        
        ))}
        
        {/* {selectedPersonId && <People person={generatedList.find(person => person.id === selectedPersonId)} isReadOnly= {readOnlyP}/> } */}
        {selectedPersonId && (
            <People
                person={
                generatedList.find(person => person.id === selectedPersonId) || {} // Providing an empty object if no matching person is found
                }
                isReadOnly={readOnlyP}
            />
            )}

        {!visibility && <button onClick={()=> returnBtn()}>Return</button>}
        {!visibility && !readOnlyP && <button onClick={()=> saveBtn()}>Save</button>}

        <br/>
        {visibility &&<button className="add-new-member" onClick={()=> addBtn()}>Add</button>}

        </div>
        
    </div>
    </>
  )
}

export default PeopleList