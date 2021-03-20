import * as types from "../actions/types";
import { updateObject } from "../../shared/utility";

const initialState = {
    token: null,
    username: null,
    loading: false,
    loginRedirectURL: "/"
};

const authInit = (state) => {
    return updateObject(state, { loading: true });
};

const authLoginSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        token: action.token,
        username: action.username
    });
};

const authLogout = (state) => {
    return updateObject(state, { token: null, username: null });
};

const userRegistrationInit = (state) => {
    return updateObject(state, { token: null, username: null, loading: true });
};

const userRegistrationSuccess = (state) => {
    return updateObject(state, {
        token: null,
        username: null,
        loading: false,
        loginRedirectURL: "/login"
    });
};

const userRegistrationFail = (state) => {
    return updateObject(state, {
        token: null,
        username: null,
        loading: false,
        loginRedirectURL: "/"
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_INIT:
            return authInit(state, action);
        case types.LOGIN_SUCCESS:
            return authLoginSuccess(state, action);
        case types.LOGOUT:
            return authLogout(state, action);
        case types.SIGNUP_INIT:
            return userRegistrationInit(state, action);
        case types.SIGNUP_SUCCESS:
            return userRegistrationSuccess(state, action);
        case types.SIGNUP_FAIL:
            return userRegistrationFail(state, action);
        case types.PASSWORD_RESET_SUCCESS:
            return
        case types.PASSWORD_RESET_FAIL:
            return
        case types.PASSWORD_RESET_CONFIRM_FAIL:
            return
        case types.PASSWORD_RESET_CONFIRM_SUCCESS:
            return
        default:
            return state;
    }
};

export default reducer;
