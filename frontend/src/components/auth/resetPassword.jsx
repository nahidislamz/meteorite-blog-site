import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Aux from "../../hoc/Aux/Aux";
import "../ui/css/login.css"
class ResetPassword extends Component {

    constructor(props){
        super(props)
        this.state = {
            email:"",
        }
    }

    loginHandler = event => {
        event.preventDefault();
        const emailInfo = {
            email: this.state.email,
        };
        this.props.onPasswordReset(emailInfo);
    };

    onEmailChange = (event) =>{
        this.setState({
            email:event.target.value
        })
    }

    render() {
      
        let message=null
     
        
        if(this.props.message){

            message =  <div className='alert alert-success' role="alert">
                            <i class="fas fa-check-circle"></i> {this.props.message}
                        </div>    
        }
        let form = (
            <Aux>
                <h1 className="h1-responsive text-center mb-4">Reset Your Pasword</h1>
                <small className="py-3 text-center text-danger">Please Enter Email To Reset The Password</small>
                {message}
                <form onSubmit={this.loginHandler}>
                        <div className="form-group mb-3">
                            <input type="email" className="form-control" placeholder="Your Email *"  required
                            value={this.state.email} onChange={this.onEmailChange} />
                        </div>
               
                        <div className="form-group mb-3">
                            <input type="submit" className="btnSubmit" value="Reset" />
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
        message:state.auth.message,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onPasswordReset: (emailInfo)=>
            dispatch(actions.reset_password(emailInfo))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPassword);
