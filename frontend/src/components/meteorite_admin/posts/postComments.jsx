import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import AxiosInstance from "../../../AxiosInstance";
import Aux from "../../../hoc/Aux/Aux";
import '../css/styles.css'

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
        AxiosInstance.get("/meteorite_admin/comments/list/" + this.props.match.params.slug, + "/",config)
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
        let commentData  = this.state.commentList.map(comment => (
                <tr key={comment.id}>
                    <td>{comment.author_full_name}</td>
                    <td>{comment.post_title}</td>
                    <td>{comment.body}</td>
                    <td>
                        <button
                            name={comment.id}
                            className="btn px-2 btn-sm btn-danger"
                            onClick={this.commentDeleteHandler}>
                                <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
            ));


        let commentsListTable = (
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Author</th>
                                    <th>Title</th>
                                    <th>Comment</th>
                                    <th>Actions</th>
                                   
                                </tr>
                            </thead>
                            <tbody>{commentData}</tbody>
                        </table>
                    </div>
                </div>
            );
        

        return (
            <Aux>
                <>
                <div className="text-center mt-5 pt-5 display-4">Comments Lists</div>
                <div className="container text-center my-4">{commentsListTable}</div>
                </>
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
