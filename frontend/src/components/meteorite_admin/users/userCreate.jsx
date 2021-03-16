import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../../hoc/Aux/Aux";
import * as actions from "../../../store/actions/index";
import AxiosInstance from "../../../AxiosInstance";
import {Link} from "react-router-dom";

class CreateUser extends Component {
    state = {
        first_name:"",
        last_name:"",
        email:"",
        username:"",
        password:"",
        is_active:true,
    };

    componentDidMount() {
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        AxiosInstance.get("/accounts/user-status/", config)
            .then(response => {
                if (response.data.is_superuser) {
                    this.setState({
                    
                        username: "",
                        password: "",
                        email: "",
                        first_name: "",
                        last_name: "",
                        is_active: ""
                        
                    });
                }
            })
            .catch(error => console.log(error.response.data));
    }

    handleChange = (event) => {
        this.setState({
          [event.target.id]: event.target.value
        })
      };

    onFormSubmitHandler = event => {
        event.preventDefault();
        let userData = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            password1:this.state.password1,
        };
  
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        this.props.onCreateUser(userData, config);
    };

    render() {

        let form = (
            <Aux>
                <nav aria-label="breadcrumb mt-4 pt-5">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to="/admin-panel">Dashboard</Link></li>
                        <li class="breadcrumb-item active" aria-current="page">Add New User</li>
                       
                    </ol>
                </nav>
                <form onSubmit={this.onFormSubmitHandler}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <input id="first_name" type="text" className="form-control" placeholder="First Name" 
                                value={this.state.first_name} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <input id="last_name" type="text" className="form-control" placeholder="Last Name" 
                                value={this.state.last_name} onChange={this.handleChange} />
                            </div>
                        </div>
                    </div>
                
                    <div className="form-group mb-3">
                        <input id="email" type="email" className="form-control" placeholder="Email *" 
                        value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div className="form-group mb-3">
                        <input id="username" type="text" className="form-control" placeholder="Username *" 
                        value={this.state.username} onChange={this.handleChange} />
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group mb-3">
                                <input id="password" type="password" className="form-control" placeholder="Password *" 
                                value={this.state.password} onChange={this.handleChange} />
                            </div>
                        </div>
                    </div>

                    <div className="form-group mb-3">
                        <input type="submit" className="btn btn-success btn-sm" value="Create New User" />
                    </div>
                
                </form>
            </Aux>
        );

        return (
            <Aux>
                <div>
                    {this.props.loading ? (
                       <p>Loading...</p>
                    ) : (
                        <div className="container mt-5 pt-5">{form}</div>
                    )}
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.admin.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateUser: (data, config) =>
            dispatch(actions.adminCreateUser(data, config))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateUser);
