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

export const logOut = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return {
        type : actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut());
        } , expirationTime * 1000);
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type : actionTypes.SET_AUTH_REDIRECT_PATH,
        path : path
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
                localStorage.setItem('token' , response.data.idToken);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('expirationDate' , expirationDate);
                localStorage.setItem('userId' , response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logOut());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token , userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/ 1000));
            } else {
                dispatch(logOut());
            }            
        }
    };
};