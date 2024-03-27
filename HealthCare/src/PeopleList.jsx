import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./styles.css"
import People from './People'
import TopDetails from './TopDetails'
import axios from 'axios';

function PeopleList() {
   
      const [peopleData, setPeopleData] = useState([]);
      const [selectedPersonId, setSelectedPersonId] = useState(null);
      const [readOnlyP, setReadOnlyP] = useState(true);
      const [visibility, setVisibility] = useState(true); //the topdetails component visibility
      const [isShow, setIsShow] = useState(false);
      const [isAdd, setIsAdd] = useState(false);
      const [isEdit, setIsEdit] = useState(false);
      const [formPatient, setFormPatient] = useState({});
      const [formTopDetails, setFormTopDetails] = useState({});
      const [formCovid, setFormCovid] = useState({});

      useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/patients');
                setPeopleData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);
    
      
      const showBtn = (personId) => {
        setSelectedPersonId(personId);
        setVisibility(false); //for the return btn
        setReadOnlyP(true);
        setIsShow(true);
        setIsAdd(false);
        setIsEdit(false);

      };

      const editBtn = (personId) => {
        setSelectedPersonId(personId);
        setVisibility(false);
        setReadOnlyP(false);
        setIsShow(false);
        setIsAdd(false);
        setIsEdit(true);

      };

    const addBtn = () => {
      setSelectedPersonId({});
      setReadOnlyP(false);
      setVisibility(false); //for the return btn
      setIsShow(false);
      setIsAdd(true);
      setIsEdit(false);

  };

      const returnBtn = () => {
        setSelectedPersonId(null);
        setVisibility(true);
        setIsShow(false);
        setIsAdd(false);
        setIsEdit(false);

      };
  return (
    <>
    <div className="people-list-general">
        <div className="list-Of-people">
            <h1>People List</h1>
            {peopleData.length > 0 && peopleData.map(person => (
          visibility &&
          <div className="topDetails-list" key={person.id}>
        <TopDetails person={person} isReadOnly={readOnlyP}/>
        <button onClick={() => showBtn(person.id)}>Show Details</button>
        <button onClick={() => editBtn(person.id)}>Edit Details</button>
    </div>
))}
        
        {selectedPersonId && (
            <People
                person=
                {peopleData.find(person => person.id === selectedPersonId) || {} // Providing an empty object if no matching person is found
                }
                isReadOnly={readOnlyP} isAdd = {isAdd} isShow ={isShow} isEdit= {isEdit}
            />
            )}

        {!visibility && <button onClick={()=> returnBtn()}>Return</button>}
        <br/>
        {visibility &&<button className="add-new-member" onClick={()=> addBtn()}>Add</button>}

        </div>
        
    </div>
    </>
  )
}

export default PeopleList