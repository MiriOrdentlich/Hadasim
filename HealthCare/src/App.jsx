import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./styles.css"
import "./People.jsx"
import "./PeopleList.jsx"
import People from './People.jsx'
import PeopleList from './PeopleList.jsx'



function App() {
  const [PersonalInfo, setPersonalInfo] = useState({id:"", fname:"",fname:"",id:"",city:"",street:"",
  streetNum:"",bday:"",telephone:"",mobile:""})


  function handleSubmit(e){
    e.preventDefault()

    setPersonalInfo(curruntInfo => {
      return [
        ...curruntInfo,
        { 
        }
      ]
    })
  }
  return (
    <>

         <PeopleList/>
    </>
  )
}

export default App
