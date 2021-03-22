import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Aux from "../../hoc/Aux/Aux";
import "../ui/css/login.css"

class ResetPasswordConfirm extends Component {

    constructor(props){
        super(props)
        this.state = {
            new_password1: "",
            new_password2: "",
            uid: "",
            token: ""
        }
    }

    resetPasswordHandler = event => {
        event.preventDefault();
        const data = {
            new_password1: this.state.new_password1,
            new_password2: this.state.new_password2,
            uid: this.props.match.params.uid,
            token: this.props.match.params.token
        };
        this.props.onPasswordResetConfirm(data);
    };

    onChange = (event) =>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    render() {
      
        let message=null
     
        
        if(this.props.message){

            if(this.props.message === 'Password has been reset with the new password.'){
           
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
                <h1 className="h1-responsive text-center mb-4">Reset Your Pasword</h1>
                <small className="py-3 text-center text-danger">Please Enter Email To Reset The Password</small>
                {message}
                <form onSubmit={this.resetPasswordHandler}>
                        <div className="form-group mb-3">
                            <input type="password" 
                            className="form-control" 
                            placeholder="New Password *" 
                            required
                            name="new_password1"
                            value={this.state.new_password1} 
                            onChange={this.onChange} />
                        </div>
                        <div className="form-group mb-3">
                            <input type="password" 
                            className="form-control"
                            placeholder="Confirm New Password *"  
                            required
                            name="new_password2"
                            value={this.state.new_password2} 
                            onChange={this.onChange} />
                        </div>
                        <div className="form-group mb-3">
                            <input type="submit" className="btnSubmit" value="Set New Password" />
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
        message:state.auth.message,
       
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onPasswordResetConfirm: (data)=>
            dispatch(actions.reset_password_confirm(data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPasswordConfirm);
