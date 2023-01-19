import React, {useState} from "react";
import userFacade from "../utils/userFacade.js";

function UpdateDog() {
    const [updated, setUpdated] = useState(false);

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    if(userFacade.hasUserAccess("admin", true)) {
        return (
            <div>
                <input type="tel" placeholder={"Id"}
                       onChange={handleChange} name={"id"} maxLength={45}/>
                <input type="text" placeholder={"Dog name"}
                       onChange={handleChange} name={"dogName"} maxLength={45}/>
                <input type="text" placeholder={"Birthdate"}
                       onChange={handleChange} name={"birthdate"} maxLength={45}/>
                <input type="text" placeholder={"Breed"}
                       onChange={handleChange} name={"breed"} maxLength={45}/>

                <select onChange={handleChange} name={"gender"}>
                    <option disabled={true} selected={true}>Choose category</option>
                    <option value={"male"}>Male</option>
                    <option value={"female"}>Female</option>
                </select>

                <button onClick={() => {
                    userFacade.updateDog(inputs.id, inputs.dogName, inputs.birthdate, inputs.breed, inputs.gender).then(() => {
                        console.log(inputs.id, inputs.dogName, inputs.birthdate, inputs.breed, inputs.gender)
                        setUpdated(true)
                    });
                }}>Submit
                </button>
                {updated ? <a>Updated</a> : null}
            </div>
        );
    }
}

export default UpdateDog;