import React, { Component } from "react";
import { Link,withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AxiosInstance from "../../AxiosInstance";
import Aux from "../../hoc/Aux/Aux";
import Tags from "././tags"
import Comments from "../comments/commentsList"
import CommentForm from "../comments/createComment"

import * as actions from "../../store/actions/index"
class PostDetails extends Component {
    state = {
        loading: true,
        postBody: [],
        comments: [],
        tags:[]
    };

    getPostBody = () => {
        AxiosInstance.get("blog/details_view/" + this.props.match.params.slug +"/")
            .then(response =>
                this.setState({ loading: false, postBody: response.data })
            )
            .catch(err => console.log("Error From PostDetail.js", err));
    };

    getTagsList = () => {
        AxiosInstance.get("blog/tags/" + this.props.match.params.slug + "/")
            .then(response => {
                this.setState({ tags: response.data });
            })
            .catch(error => {
                alert("Error Loading Comments. Try Again..!!");
            });
    };
    getCommentsList = () => {
        AxiosInstance.get("blog/comments/" + this.props.match.params.slug + "/")
            .then(response => {
                this.setState({ comments: response.data });
                console.log(response.data)
            })
            .catch(error => {
                alert("Error Loading Comments. Try Again..!!");
            });
    };
    renderWholePage = () => {
        this.getPostBody();
        this.getTagsList();
        this.getCommentsList();
      
    };
    componentDidMount() {
        this.renderWholePage();
    }

    render() {
        let postBody = <p className="text-center mt-5">Loading...</p>;
        if (!this.state.loading && this.state.postBody) {
            postBody = (
                <Aux>
                    <div className="container mt-5 pt-5">
                        <div className="row">
                            <div className="col-lg-8">
                                <h1 className="mt-4">{this.state.postBody.title}</h1>
                                <p className="lead">
                                    Atuhor : <Link to="/"> {this.state.postBody.author_full_name}</Link>
                                </p>
                                <p className="text"><b>Posted On</b> {new Date(
                                        this.state.postBody.published_on
                                    ).toDateString()}
                                </p>
                                <hr/>
                                 <Tags tagsList={this.state.tags}/>
                                <hr/>
                                

                                <img className="img-fluid rounded" src={this.state.postBody.thumbnail} alt=""/>
                                <hr/>
                                <p className="lead">
                                    {this.state.postBody.body}
                                </p>
                                <hr/>
                  
                                <h3 className="h3-responsive">
                                    Comments: {this.state.postBody.total_comments}
                                </h3>
                                {
                                    this.props.isAuth
                                    ?
                                    <CommentForm slug={this.props.match.params.slug} refresh={this.renderWholePage} />
                                    : <p className="text-dark">Please <a href="/login">Login</a>/<a href="/signup">Signup</a> to comment in this post</p>
                                }
                               
                                <Comments commentsList={this.state.comments}/>

                            </div>
                        </div>
                    </div>
                
                </Aux>
            );
        }

        return postBody;
    }
}
const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null,
        isUserProfile: state.user.userProfile !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCheckAuthStatus: () => dispatch(actions.loginCheckState())
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(PostDetails)
);


