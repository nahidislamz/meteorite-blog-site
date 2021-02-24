import * as actionTypes from "../actions/types";
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

const userRegistrationFail = (state, action) => {
    return updateObject(state, {
        token: null,
        username: null,
        loading: false,
        loginRedirectURL: "/"
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_INIT:
            return authInit(state, action);
        case actionTypes.LOGIN_SUCCESS:
            return authLoginSuccess(state, action);
        case actionTypes.LOGOUT:
            return authLogout(state, action);
        case actionTypes.SIGNUP_INIT:
            return userRegistrationInit(state, action);
        case actionTypes.SIGNUP_SUCCESS:
            return userRegistrationSuccess(state, action);
        case actionTypes.SIGNUP_FAIL:
            return userRegistrationFail(state, action);
        default:
            return state;
    }
};

export default reducer;
