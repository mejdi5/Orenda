import {Axios} from '../../Axios'
import {GET_USERS, GET_PROFILE, FILTER_USERS_BY_FULLNAME} from './ActionTypes'



//Get all users
export const getUsers = () => (dispatch) => {
    Axios
    .get("/api/users/allUsers")
    .then((res) => dispatch({ type: GET_USERS, payload: res.data }))
    .catch((err) => console.log(err));
};

//Get one user
export const getProfile = userId => (dispatch) => {
    Axios
    .get(`/api/users/user/${userId}`)
    .then((res) => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch((err) => console.log(err));
};

//Delete a user
export const deleteUser = (idUser) => (dispatch) => {
    Axios
    .delete(`/api/users/delete/${idUser}`)
    .then((res) => dispatch(getUsers()))
    .catch((err) => console.log(err));
};

//Update a user
export const editUser = (id, editedUser) => (dispatch) => {
    Axios
    .put(`/api/users/update/${id}`, editedUser)
    .then((res) => dispatch(getUsers()))
    .catch((err) => console.log(err));
};


//Filter users by fullname
export const filterUsersByFullname = payload => {
    return {
        type: FILTER_USERS_BY_FULLNAME,
        payload
    }
};

