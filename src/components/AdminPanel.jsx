import React, {useState, useEffect} from "react";
import userFacade from "../utils/userFacade.js";

function AdminPanel() {
    const [dogId, setDogId] = useState("");
    const [deleted, setDeleted] = useState(false);
    const [added, setAdded] = useState(false);

    const [inputs, setInputs] = useState({});

    const [dogs, setDogs] = useState([])
    const [refresh, setRefresh] = useState(false);

    function setErrorMessage() {
        return "Error"
    }

    useEffect(() => {
        const getData = async () => {
            userFacade.getAllDogs((data) => {
                setDogs(data);
            }, setErrorMessage)
        }
        getData();
    }, [refresh]);

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
                    userFacade.addDog(inputs.dogName, inputs.birthdate, inputs.breed, inputs.gender).then(() => {
                        setAdded(true)
                    });
                }}>Submit
                </button>
                {added ? <a>Added</a> : null}


                <hr/>
                <hr/>
                <br/>
                <br/>


                <input type="text" placeholder={"Dogname"} onChange={e => setDogId(e.target.value)}/>
                <button onClick={() => {
                    if (dogId) {
                        userFacade.deleteDog(dogId).then(() => {
                            setDeleted(true);
                        });
                    }
                }}>Delete dog
                </button>

                {deleted ? <a>Deleted</a> : null}

                <hr/>
                <br/>
                <table>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>dogName</th>
                        <th>gender</th>
                        <th>birthdate</th>
                        <th>breed</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dogs.map((dog) => (
                        <tr key={dog.dog_id}>
                            <td>{dog.dog_id}</td>
                            <td>{dog.dogName}</td>
                            <td>{dog.gender}</td>
                            <td>{dog.birthdate}</td>
                            <td>{dog.breed}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        );
    }
}

export default AdminPanel;