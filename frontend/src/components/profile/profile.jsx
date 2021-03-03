import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";
import Aux from "../../hoc/Aux/Aux";
import "../ui/css/profile.css"
import logo from "../ui/image/banner.jpg"
import avater from "../ui/image/avater.png"
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
                    <section className="card">
                        <div className="row d-flex justify-content-center justify-item-center">
                            <div className="col-md-4">
                                <div className="card profile-card-3">
                                    <div className="background-block">
                                        <img src={logo} alt={"profile"} className="background"/>
                                    </div>
                                    <div className="profile-thumb-block">
                                        <img src={avater} alt={"profile"} className="profile"/>
                                    </div>
                                    <div className="card-content">
                                        <h2>{this.props.userProfile.first_name} {this.props.userProfile.last_name}<small>Designer</small></h2>
                                        <div className="icon-block">
                                            
                                            <Link to={this.props.userProfile.facebook}>
                                            <i class="fab fa-facebook"></i>
                                            </Link>
                                            <Link to={this.props.userProfile.twitter}>
                                                <i className="fab fa-twitter"></i>
                                            </Link> 
                                            <Link to="{this.props.userProfile.facebook}">
                                                <i className="fab fa-google-plus"></i>
                                            </Link> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-sm-11 mb-2">
                                        <h2 className="h2-resposive text-center text-dark py-2">Informations</h2>
                                    </div>
                                    <div className="col-sm-1 mb-2">
                                        <Link to="/profile-edit">
                                            <button className="mt-0 mr-0 btn btn-sm p-2 btn-rounded btn-dark">
                                                <i className="fas fa-edit"></i>
                                            </button>
                                        </Link>
                                    </div>
                                </div>                             
                                <table class="table">
                                    <tbody>
                                        <tr>
                                            <td>Email: {this.props.userProfile.email}</td>
                                        </tr>
                                        <tr>
                                            <td>Username: {this.props.userProfile.username}</td>
                                        </tr>
                                        <tr> 
                                            <td>Bio: {this.props.userProfile.bio}</td>
                                        </tr>
                                        <tr> 
                                            <td>Website: 
                                                <a className="link px-2" href={this.props.userProfile.website}>
                                                {this.props.userProfile.website}
                                              </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                        
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                             
                            </div>
                        </div>
                    </section>

                  {/*}  <table className="table px-4 text-center mx-4">
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
                        </div>*/}
                   
                </Aux>
            );
        }

        if (this.props.loading) {
            profile = <p className="text-primary text-center mt-5 py-5">Loading...</p>;
        }
        return (
            <Aux>
                <div className="container mt-5 pt-5">
                    <div className="px-4 mt-5">{profile}</div>
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
