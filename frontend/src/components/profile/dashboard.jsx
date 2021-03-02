import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "../../store/actions/index";
import AxiosInstance from "../../AxiosInstance";
import Aux from "../../hoc/Aux/Aux";

class PostList extends Component {
    getPostsList = () => {
        const config = {
            headers: {
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        this.props.onListPostsToUserDashboard(config);
    };

    componentDidMount() {
        this.getPostsList();
    }

    componentWillMount() {
        this.getPostsList();
    }

    postDeleteHandler = event => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            },
            data: {
                slug: event.target.id
            }
        };

        let confirmation = window.confirm("Do You Want To Delete This Post?");

        if (confirmation) {
            AxiosInstance.delete("/accounts/delete-post/", config)
                .then(response => {
                    alert("Post Deleted");
                    this.getPostsList();
                })
                .catch(error => {
                    alert(error);
                    console.log(error)
                    this.getPostsList();
                });
        }
    };

    render() {
        let postsList = this.props.userPostsList
            ? this.props.userPostsList.map(post => (
                  <tr key={post.slug}>
                    <td>{post.title}</td>
                    <td>{post.total_comments}</td>
                    <td>{new Date(post.created_on).toDateString()}</td>
                    <td>
                        <Link to={"/dashboard/post-edit/" + post.slug }>
                            <button className="btn btn-sm btn-warning">
                                Edit
                            </button>
                        </Link>
                        <button
                            id={post.slug}
                            className="btn btn-sm btn-danger"
                            onClick={this.postDeleteHandler}>
                                Delete
                        </button>
                    </td>
          
                  </tr>
              ))
            : null;

        let userPostsListTable = <p className="text-center mt-5">Loading...</p>;

        if (!this.props.loading && this.props.userPostsList) {
            userPostsListTable = (
                <div className="container mt-5 px-1">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Total Comments</th>
                                <th>Date Created</th>
                                <th>Actions</th>
                               
                            </tr>
                        </thead>
                        <tbody>{postsList}</tbody>
                    </table>
                </div>
            );
        }

        return (
            <Aux>
                <div className="mt-5 mx-5 pt-5 px-5 display-4 text-center">Posts List</div>
                <div>{userPostsListTable}</div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userPostsList: state.post.userPostsList,
        loading: state.post.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onListPostsToUserDashboard: config =>
            dispatch(actions.listPostsToUserDashboard(config))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostList);
