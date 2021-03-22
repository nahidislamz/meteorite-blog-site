import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../../store/actions/index";
import Aux from "../../hoc/Aux/Aux";
import "../ui/css/login.css"
class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            email:"",
            password:"",
        }
    }

    loginHandler = event => {
        event.preventDefault();
        const loginInfo = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.onAuthLogin(loginInfo,this.props.history.push);
    };

    onEmailChange = (event) =>{
        this.setState({
            email:event.target.value
        })
    }
    onPasswordChange = (event) =>{
        this.setState({
            password:event.target.value
        })
    }
    render() {
      
        let message=null
     
        
        if(this.props.message){

            if(this.props.message === 'Verification e-mail sent. Please Confirm To Login'){
           
                message =  <div className='alert alert-success' role="alert">
                              <i class="fas fa-check-circle"></i> {this.props.message}
                           </div>
            }
            else{
                message =   <div className='alert alert-danger' role="alert">
                               <i class="fas fa-times-circle"></i> {this.props.message}
                            </div>
            }
        }
        let form = (
            <Aux>
                <h1 className="h1-responsive text-center mb-4">Login</h1>
                {message}
                <form onSubmit={this.loginHandler}>
                        <div className="form-group mb-3">
                            <input type="email" className="form-control" placeholder="Your Email *"  required
                            value={this.state.email} onChange={this.onEmailChange} />
                        </div>
                        <div className="form-group mb-3">
                            <input type="password" className="form-control" placeholder="Your Password *" required
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
                     <div className='col-md-6 login-form mb-4 card'>{form}</div>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        isAuth: state.auth.token !== null,
        loginRedirectURL: state.auth.loginRedirectURL,
        message:state.auth.message
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthLogin: (loginInfo,moveToLoginPage)=>
            dispatch(actions.login(loginInfo,moveToLoginPage))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
