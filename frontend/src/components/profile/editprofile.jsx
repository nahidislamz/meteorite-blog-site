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
        bio:this.props.userProfile.bio,
        facebook:this.props.userProfile.facebook,
        twitter:this.props.userProfile.twitter,
    };


    onFormSubmitEventHandler = event => {
        event.preventDefault();

        const updatedProfile = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            bio: this.state.bio,
            website: this.state.website,
            facebook:this.state.facebook,
            twitter:this.state.twitter,
        };

        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        this.props.onUserProfileEdit(updatedProfile, config);
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
    onWebsiteChange = (event) =>{
        this.setState({
            website:event.target.value
        })
    }
    onBioChange = (event) =>{
        this.setState({
            bio:event.target.value
        })
    }
    onFacebookChange= (event) =>{
        this.setState({
            facebook:event.target.value
        })
    }
    onTwitterChange= (event) =>{
        this.setState({
            twitter:event.target.value
        })
    }

    render() {

        let form = (
            <Aux>
                {!this.props.userProfile ? <Redirect to="/dashboard" /> : null}
                <h1
                    style={{
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: "200",
                        textAlign:'center',
                        marginTop:100
                    }}
                >
                    Edit Your Profile
                </h1>
                <form className="py-3 px-2" onSubmit={this.onFormSubmitEventHandler}>
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
                        <input type="text" className="form-control" placeholder="Website" 
                        value={this.state.website} onChange={this.onWebsiteChange} />
                    </div>
                    <div className="form-group mb-3">
                        <input type="text-area" className="form-control" placeholder="Bio" 
                        value={this.state.bio} onChange={this.onBioChange} />
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" placeholder="twitter" 
                                value={this.state.twitter} onChange={this.onTwitterChange} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" placeholder="facebook" 
                                value={this.state.facebook} onChange={this.onFacebookChange} />
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

        return <div className="container mt-5 px-4">{form}</div>;
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
