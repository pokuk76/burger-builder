import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch( authStart() );
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let authAPI_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDUCRJczfDaicfdlEbeLqLCy2GA2-oCHMs';
        if (!isSignup) {
            authAPI_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDUCRJczfDaicfdlEbeLqLCy2GA2-oCHMs';
        }

        axios.post(authAPI_URL, authData)
            .then( response => {
                console.log(response);
                dispatch( authSuccess(response.data.idToken, response.data.localId) );
            })
            .catch( error => {
                console.log(error);
                dispatch( authFail(error) );
            });
    };
};