import { useState } from 'react'
import "./styles.css"

function Vaccination(props) {
  const [count, setCount] = useState(0)
  const { mname = "", vDate = "" } = props.vaccination || {};

  return (
    <>
       <label>Manufacturer Name
        <input type="text" id="mname"  defaultValue={mname} readOnly={props.isReadOnly}/></label><br/>
        <label>Vaccination Date
        <input type="date" id="vDate" defaultValue={vDate} readOnly={props.isReadOnly}/></label><br/>
        <br/>
    </>
  )
}

export default Vaccination