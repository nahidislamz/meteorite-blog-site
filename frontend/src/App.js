import "./components/ui/css/blog.css";

import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/post/home';
import PostDetails from './components/post/postDetail';
import PostEdit from './components/profile/editPost';
import AdminUserEdit from "./components/meteorite_admin/users/userEdit"
import AdminPostEdit from "./components/meteorite_admin/posts/postEdit"

const asyncLogin = asyncComponent(() => {
  return import("./components/auth/login");
});
const asyncSignUp = asyncComponent(() => {
  return import("./components/auth/signup");
});
const asyncResetPassword = asyncComponent(() => {
    return import("./components/auth/resetPassword");
});
const asyncResetPasswordConfirm = asyncComponent(() => {
    return import("./components/auth/resetPasswordConfirm");
});

const asyncUserProfileView = asyncComponent(() => {
    return import("./components/profile/profile");
});
const asyncUserProfileUpdate = asyncComponent(() => {
    return import("./components/profile/editprofile");
});
const asyncCreatePost = asyncComponent(() => {
    return import("./components/profile/createPost");
});
const asyncPostListDashboard = asyncComponent(() => {
    return import("./components/profile/dashboard");
});
const asyncAdminDashboard = asyncComponent(() => {
    return import("./components/meteorite_admin/dashboard");
});
const asyncAdminUserList = asyncComponent(() => {
    return import("./components/meteorite_admin/users/userList");
});
const asyncAdminUserCreate = asyncComponent(() => {
    return import("./components/meteorite_admin/users/userCreate");
});
const asyncAdminPostList = asyncComponent(() => {
    return import("./components/meteorite_admin/posts/postList");
});
const asyncAdminCommentList = asyncComponent(() => {
    return import("./components/meteorite_admin/comments/commentsList");
});
const asyncAdminPostCommentsList = asyncComponent(() => {
    return import("./components/meteorite_admin/posts/postComments");
});

class App extends Component {
    componentDidMount() {
        this.props.onCheckAuthStatus();
    }

    render() {
        const authenticatedUsersRoutes =(
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/blog/details_view/:slug/" exact component={PostDetails}/>
                <Route path="/profile" component={asyncUserProfileView}/>
               
                {this.props.isUserProfile ? (
                    <>
                     <Route path="/profile-edit" component={asyncUserProfileUpdate}/>
                    </>
                ) : null}
                <Route
                    path="/new-post"
                    component={asyncCreatePost}
                />                
               
                <Route
                    path="/dashboard/post-list"
                    component={asyncPostListDashboard}
                />
                <Route path="/dashboard/edit/:slug/" exact component={PostEdit}/>
                {/* Admin Dashboard Routes*/}
                <Route
                    path="/admin-panel" exact
                    component={asyncAdminDashboard}
                />
                <Route
                    path="/admin-panel/user-list" exact
                    component={asyncAdminUserList}
                />
                 <Route
                    path="/admin-panel/user-create" exact
                    component={asyncAdminUserCreate}
                />
                <Route
                    path="/admin-panel/users/edit/:pk/" exact
                    component={AdminUserEdit}
                />
                <Route
                    path="/admin-panel/post-list"
                    component={asyncAdminPostList}
                />
                  <Route
                    path="/admin-panel/post/edit/:slug/" exact
                    component={AdminPostEdit}
                />
                <Route
                    path="/admin-panel/comments/list/:slug"
                    component={asyncAdminPostCommentsList}
                />
                 <Route
                    path="/admin-panel/comment-list"
                    component={asyncAdminCommentList}
                />
            </Switch>
        );
        const anonymusUsersRoutes =(
            
            <Switch>
                <Route path="/login" component={asyncLogin}/>
                <Route path="/signup" component={asyncSignUp}/>
                <Route path="/accounts/reset-password" component={asyncResetPassword}/>
                <Route path="/accounts/password-reset-confirm/:uid/:token" exact component={asyncResetPasswordConfirm}/>
                <Route path="/" exact component={Home}/>
                <Route path="/blog/details_view/:slug/" exact component={PostDetails}/>
               
            </Switch>
            
        );
        return (
          <> 
            <Header isAuth={this.props.isAuth}/>
            {
                this.props.isAuth
                ? authenticatedUsersRoutes
                : anonymusUsersRoutes
            } 
            <Footer/>
          </>

        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null,
        isUserProfile: state.user.userProfile !== null,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCheckAuthStatus: () => dispatch(actions.loginCheckState())
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
