import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index";
import Aux from "../../hoc/Aux/Aux";

class UserProfileEdit extends Component {
    state = {
        first_name: this.props.userProfile.first_name,
        last_name: this.props.userProfile.last_name,
        email: this.props.userProfile.email,
        website: this.props.userProfile.website,
        profile_pic:this.props.userProfile.profile_pic,
        bio:this.props.userProfile.bio,
        facebook:this.props.userProfile.facebook,
        twitter:this.props.userProfile.twitter,
    };


    onFormSubmitEventHandler = event => {
        event.preventDefault();

        let data = new FormData();
        data.append('first_name',  this.state.first_name);
        data.append('last_name', this.state.last_name);
        data.append('email', this.state.email);
        data.append('website', this.state.website);
        data.append('profile_pic', this.state.profile_pic);
        data.append('bio', this.state.bio);
        data.append('facebook', this.state.facebook);
        data.append('twitter', this.state.twitter);
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        this.props.onUserProfileEdit(data, config);
    };
    
    handleChange = (event) => {   
        this.setState({
           [event.target.name]:[event.target.value]
        });
    };
    onImageChange = (event)=>{
        this.setState({
            profile_pic:event.target.files[0],
        })
    }
    render() {

        let form = (
            <Aux>
                {!this.props.userProfile ? <Redirect to="/dashboard" /> : null}
                <h1 className="h1-resposive display-4 mt-4 text-center">
                    Edit Your Profile
                </h1>
                <form className="py-3 px-2" onSubmit={this.onFormSubmitEventHandler}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" name="first_name" placeholder="First Name" 
                                value={this.state.first_name} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" name="last_name" placeholder="Last Name" 
                                value={this.state.last_name} onChange={this.handleChange} />
                            </div>
                        </div>
                    </div>
                
                    <div className="form-group mb-3">
                        <input type="email" className="form-control" name="email" placeholder="Email *" 
                        value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div className="form-group mb-3">
                        <input type="text" className="form-control" name="website" placeholder="Website" 
                        value={this.state.website} onChange={this.handleChange} />
                    </div>
                    <div className="form-group mb-3">
                            <label htmlFor="file">Pofile Picture</label>
                            <input 
                                id="file"
                                accept="image/png,image/jpeg"
                                className="form-control-file"
                                type="file"
                                onChange={this.onImageChange} />
                        </div>
                    <div className="form-group mb-3">
                        <textarea type="text-area" className="form-control" name="bio" placeholder="Bio" 
                        value={this.state.bio} onChange={this.handleChange} />
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" name="facebook" placeholder="facebook" 
                                value={this.state.facebook} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
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

        if (this.props.loading) {
            form = <p>Loading...</p>;
        }

        return <div className="container mt-5 pt-5 px-4">
                   <div className="card">{form}</div> 
                </div>;
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userProfile: state.user.userProfile,
        loading: state.user.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUserProfileView: config => dispatch(actions.userProfileView(config)),
        onUserProfileEdit: (updatedProfile, config) =>
            dispatch(actions.userProfileEdit(updatedProfile, config))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfileEdit);
