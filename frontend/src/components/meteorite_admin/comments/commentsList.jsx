import React, { Component } from "react";
import { connect } from "react-redux";

import '../css/styles.css'
import * as actions from "../../../store/actions/index";
import AxiosInstance from "../../../AxiosInstance";
import Aux from "../../../hoc/Aux/Aux";
import MeteoriteAdmin from "../table"

class PostCommentsList extends Component {
    state ={
        commentList:[]
    }
    getAllComments = () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        AxiosInstance.get("/meteorite_admin/comments/list/all/",config)
        .then(response => {
            this.setState({ commentList: response.data });
            console.log(this.state.commentList);
        })
        .catch(error => {
            alert(error,"Error Loading tags. Try Again..!!");
        });
    };
    componentDidMount() {
        this.getAllComments();
    }

    commentDeleteHandler = pk => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };

        let confirmation = window.confirm(
            "Do You Want To Delete This Comment?"
        );

        if (confirmation) {
            AxiosInstance.delete(
                "/meteorite_admin/comments/detail/" + pk.target.name + "/",
                config
            )
                .then(response => {
                    alert("Comment Deleted");
                    this.getAllComments();
                })
                .catch(error => {
                    alert("Something Went Wrong");
                });
        }
    };

    render() {
        let commentsData = this.state.commentList.map(comment => (
                <tr key={comment.id}>
                    <td>{comment.author_full_name}</td>
                    <td>{comment.body}</td>
                    <td>{comment.post_title}</td>
                    <td>{new Date(comment.published_on).toDateString()}</td>
                    {comment.is_displayed ? (
                        <td style={{ color: "green" }}>Active</td>
                    ) : (
                        <td style={{ color: "red" }}>Not Active</td>
                    )}
                    <td>
                        <button
                            name={ comment.id }
                            className="btn px-2 btn-sm btn-danger"
                            onClick={this.commentDeleteHandler}>
                                <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
            ));
        

        let commentsListTable =  <p className="text-primary text-center mt-5 py-5">Loading...</p>;

        if (!this.props.loading && this.state.commentList) {
            commentsListTable = (
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Commented By</th>
                                    <th>Comments</th>
                                    <th>Post Title</th>
                                    <th>Published On</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>{commentsData}</tbody>
                        </table>
                    </div>
                </div>
            );
        }

        return (
            <Aux>
                 <MeteoriteAdmin List={commentsListTable} name='Users Comments' />
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.comment.loading,
        allComments: state.comment.allComments
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAdminCommentListLoad: (config, slug, specific) =>
            dispatch(actions.adminCommentListLoad(config, slug, specific))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostCommentsList);
