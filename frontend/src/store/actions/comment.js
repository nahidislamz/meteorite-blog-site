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

export const adminCommentListLoadInit = () => {
    return {
        type: actionTypes.ADMIN_COMMENT_LIST_LOAD_INIT
    };
};

export const adminCommentListLoadSuccess = allComments => {
    return {
        type: actionTypes.ADMIN_COMMENT_LIST_LOAD_SUCCESS,
        allComments: allComments
    };
};

export const adminCommentListLoadFail = error => {
    return {
        type: actionTypes.ADMIN_COMMENT_LIST_LOAD_FAIL,
        error: error
    };
};

export const adminCommentListLoad = (config, slug = null, specific = false) => {
    return dispatch => {
        dispatch(adminCommentListLoadInit());
        let getUrl = "/meteorite_admin/comments/list/all/";
        if (specific) {
            getUrl = "/meteorite_admin/comments/list/" + slug + "/";
        }
        AxiosInstance.get(getUrl, config)
            .then(response => {
                dispatch(adminCommentListLoadSuccess(response.data));
              
            })
            .catch(error => {
                dispatch(adminCommentListLoadFail(error));
            });
    };
};

export const adminCommentEditInit = () => {
    return {
        type: actionTypes.ADMIN_COMMENT_EDIT_INIT
    };
};

export const adminCommentEditSuccess = () => {
    return {
        type: actionTypes.ADMIN_COMMENT_EDIT_SUCCESS
    };
};

export const adminCommentEditFail = error => {
    return {
        type: actionTypes.ADMIN_COMMENT_EDIT_FAIL,
        error: error
    };
};

export const adminCommentEdit = (config, pk) => {
    return dispatch => {
        dispatch(adminCommentEditInit());
        AxiosInstance.patch(
            "/meteorite_admin/comments/detail/" + pk + "/",
            null,
            config
        )
            .then(response => {
                dispatch(adminCommentEditSuccess());
                alert("Comment Edited Successfully");
            })
            .catch(error => {
                dispatch(adminCommentEditFail(error));
                alert("ERROR...!! Something Went Wrong");
            });
    };
};
