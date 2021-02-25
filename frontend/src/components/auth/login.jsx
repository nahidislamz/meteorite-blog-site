import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index";
import Spinner from "../ui/spinner";
import Aux from "../../hoc/Aux/Aux";
import "../ui/css/login.css"
class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            username:"",
            password:"",
        }
        
    }

    loginHandler = event => {
        event.preventDefault();
        const loginInfo = {
            username: this.state.username,
            password: this.state.password
        };
        this.props.onAuthLogin(loginInfo);
       
    };

    onUsernameChange = (event) =>{
        this.setState({
            username:event.target.value
        })
    }
    onPasswordChange = (event) =>{
        this.setState({
            password:event.target.value
        })
    }
    render() {
        let formElements = [];
        for (let key in this.state.loginForm) {
            formElements.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }

        let form = (
            <Aux>
                <h1 className="text-center mb-4"
                    style={{
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: "200"
                    }}
                >
                    Login
                </h1>
                <form onSubmit={this.loginHandler}>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" placeholder="Your Username *" 
                            value={this.state.username} onChange={this.onUsernameChange} />
                        </div>
                        <div className="form-group mb-3">
                            <input type="password" className="form-control" placeholder="Your Password *" 
                            value={this.state.password} onChange={this.onPasswordChange} />
                        </div>
                        <div className="form-group mb-3">
                            <input type="submit" className="btnSubmit" value="Login" />
                        </div>
                        <div className="form-group mb-3 text-center">
                            <NavLink to="/" className="ForgetPwd px-3">Forget Password?</NavLink>
                             Don't have any account? <NavLink to="signup/"className="ForgetPwd">SignUp</NavLink>
                        </div>
                </form>
            </Aux>
        );

        return (
            <Aux>
                <div>
                    {this.props.isAuth ? (
                        <Redirect to={this.props.loginRedirectURL} />
                    ) : null}

                    {this.props.loading ? (
                        
                        <Redirect to={this.props.loginRedirectURL} />
                       
                    ) : (
                        <div className='col-md-6 login-form'>{form}</div>
                    )}
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        isAuth: state.auth.token !== null,
        loginRedirectURL: state.auth.loginRedirectURL
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthLogin: (loginInfo)=>
            dispatch(actions.login(loginInfo))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
