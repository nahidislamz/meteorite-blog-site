import React, { Component } from "react";
import { withRouter } from "react-router-dom";
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
            .then(response =>{
                 this.setState({ loading: false, postBody: response.data })
                 console.log(response.data);
            })
            .catch(err => console.log("Error From PostDetail.js", err));
    };

    getTagsList = () => {
        AxiosInstance.get("blog/tags/" + this.props.match.params.slug + "/")
            .then(response => {
                this.setState({ tags: response.data });
                
            })
            .catch(error => {
                alert("Error Loading tags. Try Again..!!");
            });
           
    };
    getCommentsList = () => {
        AxiosInstance.get("blog/comments/" + this.props.match.params.slug + "/")
            .then(response => {
                this.setState({ comments: response.data });
               
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
                    <div className="container mt-5 py-5" style={{padding:'130px'}}>
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="h1-responsive mt-4">{this.state.postBody.title}</h1>
                                <div className="d-flex pt-3">
                                    <div className="lead py-2">
                                        <img className="d-flex mr-3 rounded-circle border" 
                                            width={60} src={this.state.postBody.author_profile} alt=""/>
                                    </div>
                                   
                                    <div className="p-1">
                                        <small className="m-0 p-0 text-grey"><em>Posted By</em> </small> 
                                      
                                        <p className="m-0 p-0"> 
                                            <strong>{this.state.postBody.author_full_name}</strong>
                                        </p>
                                    </div>
                                        
                                </div>
                                <p className="text"><b>On</b> {new Date(
                                        this.state.postBody.published_on
                                    ).toDateString()}
                                </p>
                                <hr/>
                                 <span>Category: </span><Tags tagsList={this.state.tags}/>
                                <br/>
                                <div className="text-center mb-3">
                                    <img className="img-fluid" width={720} src={this.state.postBody.thumbnail} alt=""/>
                                </div>
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


