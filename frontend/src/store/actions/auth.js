import * as types from "./types";
import AxiosInstance from "../../AxiosInstance";



export const message = (text) => {
    return text
};

export const loginInit = () => {
    return {
        type: types.LOGIN_INIT
    };
};

export const loginSuccess = (token, username) => {
    return {
        type: types.LOGIN_SUCCESS,
        token: token,
        username: username
    };
};

export const loginFail = (message) => {
    return {
        type: types.LOGIN_FAIL,
        message:message
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("username");
    return {
        type: types.LOGOUT
    };
};

export const login = (loginCredentials, moveToLoginPage) => {
    return dispatch => {
        dispatch(loginInit());
        AxiosInstance.post("accounts/login/", loginCredentials)
            .then(response => {
                
                const expirationDate = new Date(
                    new Date().getTime() + 3600 * 1000
                );
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("expirationDate", expirationDate);
                localStorage.setItem("username", response.data.user.username);
                dispatch(
                    loginSuccess(
                        response.data.token,
                        response.data.user.username
                    )
                );
                moveToLoginPage("/");
               
            })
            .catch(error => {
                
                if (error.response) {
                    // Request made and server responded
                    dispatch(loginFail(error.response.data.non_field_errors));
                   
                  } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                  }
            });
    };
};

export const checkAuthTimeOut = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const loginCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(
                localStorage.getItem("expirationDate")
            );
            if (expirationDate > new Date()) {
                dispatch(
                    loginSuccess(token, localStorage.getItem("username"))
                );
                dispatch(
                    checkAuthTimeOut(
                        (expirationDate.getTime() - new Date().getTime()) / 1000
                    )
                );
            } else {
                dispatch(logout());
            }
        }
    };
};

export const signupInit = () => {
    return {
        type: types.SIGNUP_INIT
    };
};

export const signupSuccess = (message) => {
    return {
        type: types.SIGNUP_SUCCESS,
        message:message
    };
};

export const signupFail = (message) => {
    return {
        type: types.SIGNUP_FAIL,
        message:message
    };
};



export const signup = (data, moveToLoginPage) => {
    return dispatch => {
        dispatch(signupInit());
        AxiosInstance.post("accounts/signup/", data)
            .then(response => {
                //alert("Registered Successfully. You Can Now Login.");
                if(response.data.detail === "Verification e-mail sent."){
                    moveToLoginPage("/login");
                }
                dispatch(signupSuccess(response.data.detail+" Please Confirm To Login"));
            })
            .catch(error => {
               
                if (error.response) {
                    // Request made and server responded
                    if(error.response.data.username){
                        dispatch(signupFail(error.response.data.username));
                        //alert(error.response.data.username);
                    }
                    else if(error.response.data.email){
                        dispatch(signupFail(error.response.data.email));
                        //alert(error.response.data.email);
                    }
                    else if(error.response.data.password1){
                        dispatch(signupFail(error.response.data.password1));
                        //alert(error.response.data.password1);
                    }
                    else if(error.response.data.password2){
                        dispatch(signupFail(error.response.data.password2));
                        //alert(error.response.data.password2);
                    }
                  } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                  }
               
            });
    };
};


export const passwordResetSuccess = (message) => {
    return {
        type: types.PASSWORD_RESET_SUCCESS,
        message:message
    };
};
export const passwordResetFail = (message) => {
    return {
        type: types.PASSWORD_RESET_FAIL,
        message:message
    };
};


export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    AxiosInstance.post('accounts/password-reset/', email, config).then(response => {
        //alert("Registered Successfully. You Can Now Login.");
    
        dispatch(passwordResetSuccess(response.data.detail+" Please Confirm To Reset Password"));
    })
    .catch(error => {
        dispatch(passwordResetSuccess(error.response));
    });

};

export const passwordResetConfirmSuccess = (message) => {
    return {
        type: types.PASSWORD_RESET_CONFIRM_SUCCESS,
        message:message
    };
};
export const passwordResetConfirmFail = (message) => {
    return {
        type: types.PASSWORD_RESET_CONFIRM_FAIL,
        message:message
    };
};

export const reset_password_confirm = (data) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    AxiosInstance.post('accounts/password-reset-confirm/:uid/:token/', data, config).then(response => {
        //alert("Registered Successfully. You Can Now Login.");
    
        dispatch(passwordResetConfirmSuccess(response.data.detail));
    })
    .catch(error => {
        if (error.response) {
            if(error.response.data.new_password2){
                dispatch(passwordResetConfirmFail(error.response.data.new_password2));
                //alert(error.response.data.username);
            }
      
        }
        
        
    });
};