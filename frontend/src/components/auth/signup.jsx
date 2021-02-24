import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../../store/actions/index";
import Spinner from "../ui/spinner";
import Aux from "../../hoc/Aux/Aux";
import "../ui/css/login.css"
class SignUp extends Component {

    constructor(props){
        super(props)
        this.state = {
            first_name:"",
            last_name:"",
            email:"",
            username:"",
            password:"",
            password1:"",  
        }
    }

    registerHandler = event => {
        event.preventDefault();
        const signupdata = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            password1:this.state.password1,
        };
        this.props.onSignUp(
            signupdata,
            this.props.history.push
        );
    };
    onFirstNameChange = (event) =>{
        this.setState({
            first_name:event.target.value
        })
    }
    onLastNameChange = (event) =>{
        this.setState({
            last_name:event.target.value
        })
    }
    onEmailChange = (event) =>{
        this.setState({
            email:event.target.value
        })
    }
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
    onPasswordConfirmChange= (event) =>{
        this.setState({
            password1:event.target.value
        })
    }
    render() {

        return (
            <Aux>
                <div>   
                    {this.props.loading ? (
                        <Spinner />
                    ) : (
                        <div className='col-md-6 login-form'>
                            <h1 className="text-center mb-4"
                                style={{
                                    fontFamily: "Roboto, sans-serif",
                                    fontWeight: "200"
                                }}
                            >
                                SignUp
                            </h1>
                            <form onSubmit={this.registerHandler}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <input type="text" className="form-control" placeholder="First Name" 
                                            value={this.state.first_name} onChange={this.onFirstNameChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <input type="text" className="form-control" placeholder="Last Name" 
                                            value={this.state.last_name} onChange={this.onLastNameChange} />
                                        </div>
                                    </div>
                                </div>
                            
                                <div className="form-group mb-3">
                                    <input type="email" className="form-control" placeholder="Email *" 
                                    value={this.state.email} onChange={this.onEmailChange} />
                                </div>
                                <div className="form-group mb-3">
                                    <input type="text" className="form-control" placeholder="Username *" 
                                    value={this.state.username} onChange={this.onUsernameChange} />
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <input type="password" className="form-control" placeholder="Password *" 
                                            value={this.state.password} onChange={this.onPasswordChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <input type="password" className="form-control" placeholder="Confirm Password *" 
                                            value={this.state.password1} onChange={this.onPasswordConfirmChange} />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group mb-3">
                                    <input type="submit" className="btnSubmit" value="Register" />
                                </div>
                                <div className="form-group mb-3 text-center">
                                    <NavLink to="/" className="ForgetPwd px-3">Forget Password?</NavLink>
                                    Don't have any account? <NavLink to="/login"className="ForgetPwd">Login</NavLink>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: (data, moveToLoginPage) =>
            dispatch(actions.signup(data, moveToLoginPage))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);
