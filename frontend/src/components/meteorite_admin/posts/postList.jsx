import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../../store/actions/index";
import AxiosInstance from "../../../AxiosInstance";
import Aux from "../../../hoc/Aux/Aux";
import MeteoriteAdmin from "../table"
import '../css/styles.css'

class PostList extends Component {
    getAllPosts = () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        this.props.onAdminViewAllPosts(config);
    };
    componentDidMount() {
        this.getAllPosts();
    }

    postDeleteHandler = (event) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        let slug = event.target.name
        console.log(slug)
        let confirmation = window.confirm("Do You Want To Delete This Post?");

        if (confirmation) {
            AxiosInstance.delete(
                "/meteorite_admin/posts/view/" + slug + "/",
                config
            )
                .then(response => {
                    alert("Post Deleted");
                    this.getAllPosts();
                })
                .catch(error => {
                    alert("Something Went Wrong");
                });
        }
    };

    render() {
        let postsList = this.props.allPosts;
        
        if (this.props.allPosts) {
            postsList = this.props.allPosts.map(post => (
                <tr key={post.slug}>
                    <td>{post.title}</td>
                    <td className="text-center"><span className="badge badge-pill badge-dark">{post.total_comments}</span></td>
                    <td>{post.author_full_name}</td>
                    {post.is_published ? (
                        <td style={{ color: "green" }}>Published</td>
                    ) : (
                        <td style={{ color: "red" }}>Not Published</td>
                    )}
                      <td>
                        <Link to={"/admin-panel/post/edit/" + post.slug }>
                            <button className="btn px-2 btn-sm btn-warning">
                                <i className="fas fa-edit"></i>
                            </button>
                        </Link>
                        <button
                            name={post.slug}
                            className="btn px-2 btn-sm btn-danger"
                            onClick={this.postDeleteHandler}>
                                <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                    <td>
                        <Link to={"/admin-panel/comments/list/" + post.slug}>
                            View Comments
                        </Link>
                    </td>
                </tr>
            ));
        }

        let postsListTable =  <p className="text-primary text-center mt-5 py-5">Loading...</p>;;

        if (!this.props.loading && this.props.allPosts) {
            postsListTable = (
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Total Comments</th>
                                    <th>Author</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                    <th>Comments</th>
                                </tr>
                            </thead>
                            <tbody>{postsList}</tbody>
                        </table>
                    </div>
                </div>
            );
        }

        return (
            <Aux>
                <MeteoriteAdmin List={postsListTable} name='Posts' />
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.admin.loading,
        allPosts: state.admin.allPosts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAdminViewAllPosts: config =>
            dispatch(actions.adminViewAllPosts(config))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostList);
