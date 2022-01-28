import axios from "axios";
import { LOGIN, LOGIN_LOADING } from "../constants";
// require('dotenv').config();

export const login = (data, navigate) => async (dispatch) => {
    console.log('History passed from login page:::', navigate);
    console.log("Data for user login::", data)
    // dispatch({ type: LOGIN_LOADING, payload: true });
    // console.log('React app api url', process.env.REACT_APP_API_URL)
    const response = await axios.post(`${process.env.REACT_APP_API_URL}user/login`, data)
    // .then(response => {
            console.log("Response login for token: ", response)
            localStorage.setItem('userId', response.data.data._id);
            localStorage.setItem('userName', response.data.data.userName);
            // localStorage.setItem('email', response.data.data.email);
            if(response.status === 200) {
                dispatch({
                    type: LOGIN,
                    payload: response.data.data
                })
                navigate('/')
            } 
        // })
        // .catch(error => {
            // console.log(error)
            // alert('Error while logging in!')
            dispatch({ type: LOGIN_LOADING, payload: false });
        // })
}


// import axios from "axios";
// import { LOGIN, LOGIN_LOADING } from "../constants";
// // require('dotenv').config();

// export const login = (data) => async (dispatch) => {
//     console.log("Data for login user:", data)
//     try {
//         const res = await axios.post(`${process.env.REACT_APP_API_URL}user/login`, data)
//         console.log("Response from backend for login:", res)
//         // const res = await axios.get(`${apiUrl}todo`)
//         // const res = await axios.get(`${apiUrl}/todo?userId=${userId}`, config);
//         // dispatch(setIsFetchingTodos(true));

//         if (res.status === 200) {
//             dispatch({
//                 type: LOGIN,
//                 isFetching: false,
//                 payload: res.data.data,
//             });
//         } else {
//             // dispatch(setIsFetching(false));
//         }

//     } catch (error) {
//         // dispatch(setIsFetching(false));
//     }
// }


