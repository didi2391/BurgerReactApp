import axios from 'axios';

import * as actionTypes from '../actions/actionTypes';

export const authStart = () => {
    return {
        type : actionTypes.AUTH_START
    };
};


export const authSuccess = (token , userId) => {
    return {
        type : actionTypes.AUTH_SUCCESS,
        idToken : token,
        userId : userId
    };
};

export const authFail = (err) => {
    return {
        type : actionTypes.AUTH_FAIL,
        error : err
    };
};

export const auth = (email , password , isSignup) => {
    return dispatch => {
        dispatch(authStart());

        const authData = {
            email : email , 
            password : password,
            returnSecureToken : true
        }

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAqGoW--xM_bH5p_zcHaz4w9C8ULl80XVE';        
        if(!isSignup) {
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAqGoW--xM_bH5p_zcHaz4w9C8ULl80XVE"
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            });
    };
};