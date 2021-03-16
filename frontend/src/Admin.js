import "./components/ui/css/blog.css";

import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

import AdminUserEdit from "./components/meteorite_admin/users/userEdit"
import AdminPostEdit from "./components/meteorite_admin/posts/postEdit"
import MeteoriteAdmin from "./components/meteorite_admin/dashboard"


const asyncAdminUserList = asyncComponent(() => {
    return import("./components/meteorite_admin/users/userList");
});
const asyncAdminPostList = asyncComponent(() => {
    return import("./components/meteorite_admin/posts/postList");
});
const asyncAdminPostCommentsList = asyncComponent(() => {
    return import("./components/meteorite_admin/posts/postComments");
});
class App extends Component {
    componentDidMount() {
        this.props.onCheckAuthStatus();
    }

    render() {
        
        return (
          <> 
          <MeteoriteAdmin isAuth={this.props.isAuth}/>
            <Switch>
            <Route
                    path="/admin-panel/user-list"
                    component={asyncAdminUserList}
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
            </Switch>
         
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
