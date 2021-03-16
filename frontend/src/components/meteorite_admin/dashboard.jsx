import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";
import AxiosInstance from "../../AxiosInstance";
import Aux from "../../hoc/Aux/Aux";
import './css/styles.css'
import SideBar from "./sidebar";
import Card from "./card"
class AdminDashboard extends Component {
   
    componentWillMount() {
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        this.props.onAdminViewAllPosts(config);
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
                    <td>{post.author_full_name}</td>
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
                                    <th>Author</th>
                                    <th>Actions</th>
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
              <div id="layoutSidenav">
                    <SideBar/>
                
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid">
                                <h1 className="mt-4">Dashboard</h1>
                                <ol className="breadcrumb mb-4">
                                    <li className="breadcrumb-item-active">Dashboard</li>
                                
                                </ol>
                                <Card/>
                                <div className="row">
                                    {/*
                                    <div className="col-xl-6">
                                        <div className="card mb-4">
                                            <div className="card-header">
                                            <h4>New User</h4>
                                            </div>
                                            <div className="card-body">
                                                {userListTable}
                                            </div>
                                        </div>
                                    </div>
                                    */}
                                    <div className="col-xl-12">
                                        <div className="card mb-4">
                                            <div className="card-header">
                                            <h4>New Posts</h4>
                                            </div>
                                            <div className="card-body">
                                                {postsListTable}
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            
                            </div>
                        </main>
                     </div>
                </div>
                
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.admin.loading,
        allPosts: state.admin.allPosts,
        userList: state.admin.userList,
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
)(AdminDashboard);
