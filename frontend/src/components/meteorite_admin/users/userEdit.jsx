import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import Aux from "../../../hoc/Aux/Aux";
import {Link} from "react-router-dom";
import AxiosInstance from "../../../AxiosInstance"
class EditUser extends Component {
    state = {
        username:  "",
        password:  "",
        email:  "",
        first_name:  "",
        last_name:  "",
        website:  "",
        bio:  "",
        facebook:  "",
        twitter:"",
        is_active:  false ,
        is_staff:  false ,
        is_superuser: false ,
    };

    componentWillMount() {
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            },
            params: {
                pk: this.props.match.params.pk
            }
        };
        AxiosInstance.get("/meteorite_admin/users/detail/", config)
        .then(response => {
            this.setState({
               
                username:  response.data.username,
                password:  response.data.password,
                email:  response.data.email,
                first_name:  response.data.first_name,
                last_name:  response.data.last_name,
                website:  response.data.website,
                bio:  response.data.bio,
                facebook:  response.data.facebook,
                twitter:response.data.twitter,
                is_active:  response.data.is_active ? true : false,
                is_staff:  response.data.is_staff ? true : false,
                is_superuser: response.data.is_superuser ? true : false,
                
            });
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
            //alert("Something Went Wrong");
        });
    }
    onFormSubmitEventHandler = event => {
        event.preventDefault();
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                AUTHORIZATION: "JWT " + this.props.token
            },
            data:{
                pk: this.props.match.params.pk,
                username:  this.state.username,
                password:  this.state.password,
                email:  this.state.email,
                first_name:  this.state.first_name,
                last_name:  this.state.last_name,
                website:  this.state.website,
                bio:  this.state.bio,
                facebook:  this.state.facebook,
                twitter:this.state.twitter,
                is_active:  true ,
                is_staff:  false,
                is_superuser: false,
            }
        };
        this.props.onAdminEditUser(config);
        console.log(config)
    };
    
    handleChange = (event) => {   
        this.setState({
           [event.target.name]:[event.target.value]
        });
    };


    render() {
        let form =  <p className="text-primary text-center mt-5 py-5">Loading...</p>;
        if(this.state){
             form = (
                <Aux>
                    <nav aria-label="breadcrumb mt-4 pt-5">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to="/admin-panel">Dashboard</Link></li>
                            <li class="breadcrumb-item active" aria-current="page"><Link to="/admin-panel/user-list">Users</Link> </li>
                            <li class="breadcrumb-item active" aria-current="page">{this.state.username}</li>
                        </ol>
                    </nav>
                    <form className="py-3 px-2" onSubmit={this.onFormSubmitEventHandler}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="first_name">First Name</label>
                                    <input type="text" className="form-control" name="first_name" placeholder="First Name" 
                                    value={this.state.first_name} onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="last_name">Last Name</label>
                                    <input type="text" className="form-control" name="last_name" placeholder="Last Name" 
                                    value={this.state.last_name} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" name="email" placeholder="Email *" 
                                    value={this.state.email} onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="username">UserName</label>
                                    <input type="text" className="form-control" name="username" placeholder="Username *" 
                                    value={this.state.username} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="form-group mb-3">
                                    <label htmlFor="password">Password</label>
                                    <input type="text" className="form-control" name="password" placeholder="Password *" 
                                    value={this.state.password} onChange={this.handleChange} />
                        </div>
                      
                        <div className="form-group mb-3">
                            <label htmlFor="website">Website</label>
                            <input type="text" className="form-control" name="website" placeholder="Website" 
                            value={this.state.website} onChange={this.handleChange} />
                        </div>
                        
                        <div className="form-group mb-3">
                            <label htmlFor="bio">Biography</label>
                            <textarea type="text-area" className="form-control" name="bio" placeholder="Bio" 
                            value={this.state.bio} onChange={this.handleChange} />
                        </div>
    
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                <label htmlFor="facebool">Facebook</label>
                                    <input type="text" className="form-control" name="facebook" placeholder="facebook" 
                                    value={this.state.facebook} onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                <label htmlFor="twitter">Twitter</label>
                                    <input type="text" className="form-control" name="twitter" placeholder="twitter" 
                                    value={this.state.twitter} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
              
                        <div className="form-group mb-3 text-center">
                            <input type="submit" className="btn btn-success" value="Update Profile" />
                        </div>
                                   
                    </form>
                </Aux>
            );
        }
       

        if (this.props.loading) {
            form = <p>Loading...</p>;
        }

        return <div className="container mt-5 pt-5 px-4 my-4">
                   <div className="px-4">{form}</div> 
                </div>;
    }
}



const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.user.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAdminEditUser: config => dispatch(actions.adminEditUser(config))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditUser);
