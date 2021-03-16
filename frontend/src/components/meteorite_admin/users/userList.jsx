import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../../store/actions/index";
import AxiosInstance from "../../../AxiosInstance";
import Aux from "../../../hoc/Aux/Aux";
import '../css/styles.css'
import MeteoriteAdmin from "../table"
class UserList extends Component {
    getUsersList = () => {
        const config = {
            headers: {
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        this.props.onAdminUserListView(config);
    };

    componentWillMount() {
        this.getUsersList();
    }

    userDeleteHandler = userPk => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            },
            data: {
                pk: userPk
            }
        };

        let confirmation = window.confirm("Do You Want To Delete This User?");

        if (confirmation) {
            AxiosInstance.delete("/meteorite_admin/users/detail/", config)
                .then(response => {
                    alert("Post Deleted");
                    this.getUsersList();
                })
                .catch(error => {
                    alert("Something Went Wrong");
                });
        }
    };

    render() {
        let userList = null;
        if (this.props.userList) {
            userList = this.props.userList.map(user => (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    {user.is_active ? (
                        <td style={{ color: "green" }}>Active</td>
                    ) : (
                        <td style={{ color: "red" }}>Not Active</td>
                    )}
                    <td>
                        <Link to={"/admin-panel/users/edit/" + user.id }>
                            <button className="btn px-2 btn-sm btn-warning">
                                <i className="fas fa-edit"></i>
                            </button>
                        </Link>
                        <button
                            id={user.id}
                            className="btn px-2 btn-sm btn-danger"
                            onClick={this.userDeleteHandler}>
                                <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
            ));
        }

        let userListTable =  <p className="text-primary text-center mt-5 py-5">Loading...</p>;

        if (!this.props.loading && this.props.userList) {
            userListTable = (
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>{userList}</tbody>
                        </table>
                    </div>
  
                </div>
            );
        }

        return (
            <Aux>
                 <MeteoriteAdmin name='User' List={userListTable}/>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userList: state.admin.userList,
        loading: state.admin.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAdminUserListView: config =>
            dispatch(actions.adminUserListView(config))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);
