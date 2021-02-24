import * as actionTypes from "../actions/types";
import { updateObject } from "../../shared/utility";

const initialState = {
    loading: false,
    error: null,
    allComments: null
};

const createCommentInit = (state) => {
    return updateObject(state, {
        loading: true,
        error: null,
        allComments: null
    });
};

const createCommentSuccess = (state) => {
    return updateObject(state, {
        loading: false,
        error: null,
        allComments: null
    });
};

const createCommentFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error,
        allComments: null
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_COMMENT_INIT:
            return createCommentInit(state, action);
        case actionTypes.CREATE_COMMENT_SUCCESS:
            return createCommentSuccess(state, action);
        case actionTypes.CREATE_COMMENT_FAIL:
            return createCommentFail(state, action);
        default:
            return state;
    }
};

export default reducer;
