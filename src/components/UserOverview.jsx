import React, {useEffect, useState} from "react";
import userFacade from "../utils/userFacade.js";

function UserOverview() {
    const [users, setUsers] = useState([])
    const [refresh, setRefresh] = useState(false);

    function setErrorMessage() {
        return "Error"
    }

    useEffect(() => {
        const getData = async () => {
            userFacade.getAllUsersFromWalker((data) => {
                setUsers(data);
            }, setErrorMessage)
        }
        getData();
    }, [refresh]);
    return (
        <div>
            <br/>
            <h1>User overview</h1>
            <hr/>
            <br/>
            <br/>
            <br/>
            <h2>All users from walker</h2>
            {users.map((user) => {
                return (
                    <>
                        <p>{user.userName}</p>
                        <p>{user.userEmail}</p>
                    </>
                )
            })}
        </div>
    );

}

export default UserOverview;