import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../../store/actions/index";
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
            password1:"",
            password2:"",  
           
        }
    }

    registerHandler = event => {
        event.preventDefault();
        const signupdata = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            username: this.state.username,
            password1: this.state.password1,
            password2:this.state.password2,
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
            password1:event.target.value
        })
    }
    onPasswordConfirmChange= (event) =>{
        this.setState({
            password2:event.target.value
        })
    }

    render() {
        let message=<div></div>
        if(this.props.message){
            message = <div className="alert alert-danger" role="alert">
                            {this.props.message}                          
                      </div>
        }
        return (
            <Aux>
  
                <div className='col-md-6 login-form mb-4 card'>
                    <h1 className="h1-responsive text-center mb-4">SignUp</h1>
                    {message}
                    <form onSubmit={this.registerHandler}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <input type="text" 
                                    className="form-control" 
                                    placeholder="First Name" 
                                    value={this.state.first_name} 
                                    onChange={this.onFirstNameChange} 
                                    required/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <input type="text" 
                                    className="form-control" 
                                    placeholder="Last Name" 
                                    value={this.state.last_name} 
                                    onChange={this.onLastNameChange} 
                                    required/>
                                </div>
                            </div>
                        </div>
                    
                        <div className="form-group mb-3">
                            <input type="email" 
                            className="form-control" 
                            placeholder="Email *" 
                            value={this.state.email} 
                            onChange={this.onEmailChange} 
                            required/>
                        </div>
                        <div className="form-group mb-3">
                            <input type="text" 
                            className="form-control" 
                            placeholder="Username *" 
                            value={this.state.username} 
                            onChange={this.onUsernameChange} 
                            required/>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <input type="password" className="form-control" 
                                    placeholder="Password *" 
                                    value={this.state.password1} 
                                    onChange={this.onPasswordChange} 
                                    required/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <input type="password" 
                                    className="form-control" 
                                    placeholder="Confirm Password *" 
                                    value={this.state.password2}
                                    onChange={this.onPasswordConfirmChange} 
                                    required/>
                                </div>
                            </div>
                        </div>

                        <div className="form-group mb-3">
                            <input type="submit" 
                            id="button"
                            className="btnSubmit" value="Register"/>
                        </div>
                        <div className="form-group mb-3 text-center">
                            <NavLink to="/accounts/reset-password" className="ForgetPwd px-3">Forget Password?</NavLink>
                            Don't have any account? <NavLink to="/login"className="ForgetPwd">Login</NavLink>
                        </div>
                    </form>
                </div>
              
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        message:state.auth.message
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
