import apiFacade from "./apiFacade.js";
import loginFacade from "./loginFacade.js";
import {API_URL} from "../../settings.js";

function UserFacade() {

    const getAllUsers = (updateAction, setErrorMessage) => {
        return apiFacade.fetchData("users/all", updateAction, setErrorMessage)
    }

    const getUserByUserName = (userName) => {
        const options = apiFacade.makeOptions("GET", null, null);
        return fetch(API_URL + "/api/users/" + userName, options)
            .then(apiFacade.handleHttpErrors)
    }

    const createUser = (user, email, password) => {
        const options = apiFacade.makeOptions("POST", null,
            {
                "userName": user,
                "userEmail": email,
                "userPass": password
            }
        )
        return fetch(API_URL + "/api/users", options)
            .then(apiFacade.handleHttpErrors)
    }

    const updateUser = (username, updateEmail, updatePassword) => {
        const options = apiFacade.makeOptions("PUT", true,
            {
                "userName": username,
                "userEmail": updateEmail,
                "userPass": updatePassword
            }
        )
        return fetch(API_URL + "/api/users/" + username, options)
            .then(apiFacade.handleHttpErrors)
    }

    const deleteUser = (userName) => {
        const options = apiFacade.makeOptions("DELETE", null, null);
        return fetch(API_URL + "/api/users/" + userName, options)
            .then(apiFacade.handleHttpErrors)
    }

    const getUserRoles = () => {
        const token = loginFacade.getToken()
        if (token != null) {
            const payloadBase64 = loginFacade.getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            const roles = decodedClaims.roles
            return roles
        } else return ""
    }

    const hasUserAccess = (neededRole, loggedIn) => {
        const roles = getUserRoles().split(',')
        return loggedIn && roles.includes(neededRole)
    }

    const getUserName = () => {
        const token = loginFacade.getToken()
        if (token != null) {
            const payloadBase64 = loginFacade.getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            return decodedClaims.username
        } else return ""
    }

    const getUserEmail = () => {
        const token = loginFacade.getToken()
        if (token != null) {
            const payloadBase64 = loginFacade.getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            return decodedClaims.userEmail
        } else return ""
    }

    const getUserPass = () => {
        const token = loginFacade.getToken()
        if (token != null) {
            const payloadBase64 = loginFacade.getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            return decodedClaims.userPass
        } else return ""
    }

    //Dog

    //US-1
    const getAllUsersFromWalker = (updateAction, setErrorMessage) => {
        return apiFacade.fetchData("users/all/walkers", updateAction, setErrorMessage)
    }

    const deleteDog = (dogId) => {
        const options = apiFacade.makeOptions("DELETE", null, null);
        return fetch(API_URL + "/api/users/dog/" + dogId, options)
            .then(apiFacade.handleHttpErrors)
    }

    const addDog = (dog_name, birthdate, breed, gender) => {
        const options = apiFacade.makeOptions("POST", null,
            {
                "dogName": dog_name,
                "gender": gender,
                "birthdate": birthdate,
                "breed": breed
            }
        )
        return fetch(API_URL + "/api/users/dog", options)
            .then(apiFacade.handleHttpErrors)
    }

    const updateDog = (dog_id, dog_name, birthdate, breed, gender) => {
        const options = apiFacade.makeOptions("PUT", null,
            {
                "dog_id": dog_id,
                "dogName": dog_name,
                "gender": gender,
                "birthdate": birthdate,
                "breed": breed
            }
        )
        return fetch(API_URL + "/api/users/dog/update", options)
            .then(apiFacade.handleHttpErrors)
    }

    //Extra
    const getAllDogs = (updateAction, setErrorMessage) => {
        return apiFacade.fetchData("users/dogs/all", updateAction, setErrorMessage)
    }

    return {
        getAllUsers,
        getUserByUserName,
        createUser,
        updateUser,
        deleteUser,
        getUserRoles,
        hasUserAccess,
        getUserName,
        getUserEmail,
        getUserPass,

        //Dog
        deleteDog,
        addDog,
        updateDog,
        getAllUsersFromWalker,
        getAllDogs
    }
}

const userFacade = UserFacade();
export default userFacade;