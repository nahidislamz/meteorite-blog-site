import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Aux/Aux";
import * as actions from "../../store/actions/index";


class CreateComment extends Component {
    state = {
            body:"",
        }
  
    onBodyChange = (event) => {
        this.setState({
            body:event.target.value,
        });
    };

    onFormSubmitHandler = event => {
        event.preventDefault();
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            }
        }
        let data={
            body:this.state.body
        }
        this.props.onCreateComment(
            data,
            this.props.slug,
            config,
            this.props.refresh,
        )
    };

    render() {
        let form = (
            <Aux>
                 <div className="card my-4">
                    <h5 className="card-header">Leave a Comment:</h5>
                    <div className="card-body">
                        <form onSubmit={this.onFormSubmitHandler}> 
                            <div className="form-group">
                                <textarea onChange={this.onBodyChange} className="form-control" rows="3"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </Aux>
        );

        return (
            <Aux>
                <div>
                    {this.props.loading ? (
                       <p className="text-center mt-5">Loading...</p>
                    ) : (
                        <div>{form}</div>
                    )}
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isUserProfile: state.user.userProfile !== null,
        loading: state.comment.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateComment: (data,slug,config,refreshFunction) =>
            dispatch(actions.createComment(data,slug,config,refreshFunction))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateComment);
