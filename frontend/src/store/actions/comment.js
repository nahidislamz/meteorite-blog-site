import * as actionTypes from "./types";

import AxiosInstance from "../../AxiosInstance";

export const createCommentInit = () => {
    return {
        type: actionTypes.CREATE_COMMENT_INIT
    };
};

export const createCommentSuccess = () => {
    return {
        type: actionTypes.CREATE_COMMENT_SUCCESS
    };
};

export const createCommentFail = error => {
    return {
        type: actionTypes.CREATE_COMMENT_FAIL,
        error: error
    };
};

export const createComment = (data, slug,config,refreshFunction) => {
    return dispatch => {
        dispatch(createCommentInit());
        AxiosInstance.post("/blog/comment-create/" + slug + "/", data,config)
            .then(response => {
                alert("Comment Added Successfully");
                dispatch(createCommentSuccess());
                refreshFunction();
            })
            .catch(error => {
                alert(error+" Something Went Wrong");
                dispatch(createCommentFail(error));
            });
            console.log(config)
    };
};
