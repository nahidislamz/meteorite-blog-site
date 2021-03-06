import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../ui/css/profile.css"
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
                  <tr className="my-2" key={post.slug}>
                        <td>
                          <img className="img img-cover" width={140} src={post.thumbnail} alt=""/>
                        </td>
                        <td>
                            <h5 className="h5-responsive"> {post.title} </h5>
                            <small className="badge badge-pill badge-info">Comments: {post.total_comments}</small>
                        </td>
                        
                        <td>{new Date(post.created_on).toDateString()}</td>
                        <td>
                            <Link to={"/dashboard/edit/" + post.slug }>
                                <button className="btn px-2 btn-sm btn-warning">
                                    <i className="fas fa-edit"></i>
                                </button>
                            </Link>
                            <button
                                id={post.slug}
                                className="btn px-2 btn-sm btn-danger"
                                onClick={this.postDeleteHandler}>
                                    <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                  </tr>
              ))
            : null;

        let userPostsListTable = <p className="text-center mt-5">Loading...</p>;

        if (!this.props.loading && this.props.userPostsList) {
            userPostsListTable = (
                <div className="container mt-5 px-1">
                    <table className="table table-borderless">
                        <tbody>{postsList}</tbody>
                    </table>
                </div>
            );
        }

        return (
            <Aux>
                <div className="mt-5 pt-5 mx-5">
                    <div className="card">
                        <div className="py-3 display-4 text-center">Posts List</div>
                        <div className>{userPostsListTable}</div>
                    </div>
                    
                </div>
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
