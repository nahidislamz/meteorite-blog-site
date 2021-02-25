import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import Header from './components/header';
import Footer from './components/footer';
import "./components/ui/css/blog.css"
import Home from './components/post/home'
import PostDetails from './components/post/postDetail'
const asyncLogin = asyncComponent(() => {
  return import("./components/auth/login");
});
const asyncSignUp = asyncComponent(() => {
  return import("./components/auth/signup");
});

class App extends Component {
    componentDidMount() {
        this.props.onCheckAuthStatus();
    }

    render() {
        const authenticatedUsersRoutes =(
            <Switch>
                <Route path="/" exact="true" component={Home}/>
                <Route path="/blog/details_view/:slug/" exact="true" component={PostDetails}/>
            </Switch>
        );
        const anonymusUsersRoutes =(
            <Switch>
                <Route path="/login" component={asyncLogin}/>
                <Route path="/signup" component={asyncSignUp}/>
                <Route path="/" exact="true" component={Home}/>
                <Route path="/blog/details_view/:slug/" exact="true" component={PostDetails}/>
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
