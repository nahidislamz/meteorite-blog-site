import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";
import Aux from "../../hoc/Aux/Aux";

class UserProfileView extends Component {
    fetchUserProfile = () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        this.props.onUserProfileView(config);
    };

    componentWillMount() {
        this.fetchUserProfile();
    }

    render() {
        let profile = null;
        if (this.props.userProfile) {
            profile = (
                <Aux>
                    <table className="table px-4 text-center mx-4">
                        <tbody>
                            <tr>
                                <th>First Name</th>
                                <td>{this.props.userProfile.first_name}</td>
                            </tr>
                            <tr>
                                <th>Last Name</th>
                                <td>{this.props.userProfile.last_name}</td>
                            </tr>
                            <tr>
                                <th>Username</th>
                                <td>{this.props.userProfile.username}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{this.props.userProfile.email}</td>
                            </tr>
                            <tr>
                                <th>Bio</th>
                                <td>{this.props.userProfile.bio}</td>
                            </tr>
                            <tr>
                                <th>Website</th>
                                <td>
                                    <a href={this.props.userProfile.website}>
                                        {this.props.userProfile.website}
                                    </a>
                                </td>
                            </tr>      
                        </tbody>
                    </table>
                    <div className="text-center py-3">
                    {this.props.userProfile.facebook ? (
                        <a href={this.props.userProfile.facebook}>
                            <img
                                width="50px"
                                className="px-1 img"
                                src="https://svgshare.com/i/7V_.svg"
                                alt="Facebook"
                                title="Facebook"
                            />
                        </a>
                    ) : null}
                    {this.props.userProfile.twitter ? (
                        <a
                            href={
                                this.props.userProfile.twitter
                            }
                        >
                            <img
                                width="50px"
                                className="px-1 img"
                                src="https://svgshare.com/i/7Vj.svg"
                                alt="Twitter"
                                title="Twitter"
                            />
                        </a>
                    ) : null}
                    </div>

                </Aux>
            );
        }

        if (this.props.loading) {
            profile = <p className="text-primary text-center mt-5 py-5">Loading...</p>;
        }
        return (
            <Aux>
                <div className="container mt-5">
                    <div className="text-center display-4 pt-5 mt-5">Your Profile</div>
                    <div className="px-4">{profile}</div>
                    <div className="text-center">
                        <Link to="/profile-edit">
                            <button className="btn btn-outline btn-dark py-1">Edit Profile</button>
                        </Link>
                    </div>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.user.loading,
        userProfile: state.user.userProfile
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUserProfileView: config => dispatch(actions.userProfileView(config))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfileView);
