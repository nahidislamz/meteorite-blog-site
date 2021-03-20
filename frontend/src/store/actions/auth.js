import * as types from "./types";
import AxiosInstance from "../../AxiosInstance";

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

export const loginFail = error => {
    return {
        type: types.LOGIN_FAIL
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

export const login = (loginCredentials) => {
    return dispatch => {
        dispatch(loginInit());
        AxiosInstance.post("auth/login/", loginCredentials)
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
               
            })
            .catch(error => {
                dispatch(loginFail(error));
                alert("ERROR");
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

export const signupSuccess = () => {
    return {
        type: types.SIGNUP_SUCCESS
    };
};

export const signupFail = () => {
    return {
        type: types.SIGNUP_FAIL
    };
};

export const signup = (data, moveToLoginPage) => {
    return dispatch => {
        dispatch(signupInit());
        AxiosInstance.post("/accounts/signup/", data)
            .then(response => {
                dispatch(signupSuccess());
                alert("Registered Successfully. You Can Now Login.");
                moveToLoginPage("/login");
            })
            .catch(error => {
                dispatch(signupFail());

                alert(error);
            });
    };
};


export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email });

    try {
        await AxiosInstance.post('/accounts/password/reset/', body, config);

        dispatch({
            type: types.PASSWORD_RESET_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: types.PASSWORD_RESET_FAIL
        });
    }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        await AxiosInstance.post('/accounts/password/reset/confirm/', body, config);

        dispatch({
            type: types.PASSWORD_RESET_CONFIRM_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: types.PASSWORD_RESET_CONFIRM_FAIL
        });
    }
};