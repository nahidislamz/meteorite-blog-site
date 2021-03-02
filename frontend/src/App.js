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
const asyncLogin = asyncComponent(() => {
  return import("./components/auth/login");
});
const asyncSignUp = asyncComponent(() => {
  return import("./components/auth/signup");
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
const asyncPostEditDashboard = asyncComponent(() => {
    return import("./components/profile/editPost");
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
                     <Route path="/dashboard/post-edit/:slug/"component={asyncPostEditDashboard} />
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
                <Route
                    path="/dashboard/post-edit"
                    component={asyncPostEditDashboard}
                />
            </Switch>
        );
        const anonymusUsersRoutes =(
            <Switch>
                <Route path="/login" component={asyncLogin}/>
                <Route path="/signup" component={asyncSignUp}/>
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
        isUserProfile: state.user.userProfile !== null
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
