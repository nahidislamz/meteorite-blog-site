import React, { Component } from "react";
import { Link } from "react-router-dom";
import AxiosInstance from "../../AxiosInstance";
import Spinner from "../ui/spinner";
import Aux from "../../hoc/Aux/Aux";
import Tags from "././tags"

class PostDetails extends Component {
    state = {
        loading: true,
        postBody: null,
        comments: null,
        tags:null
    };

    getPostBody = () => {
        AxiosInstance.get("blog/details_view/" + this.props.match.params.slug)
            .then(response =>
                this.setState({ loading: false, postBody: response.data })
            )
            .catch(err => console.log("Error From PostDetail.js", err));
    };

    getCommentsList = () => {
        AxiosInstance.get("comments/" + this.props.match.params.slug + "/")
            .then(response => {
                this.setState({ comments: response.data });
            })
            .catch(error => {
                alert("Error Loading Comments. Try Again..!!");
            });
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

    renderWholePage = () => {
        this.getPostBody();
        this.getTagsList();
      
    };
    componentDidMount() {
        this.renderWholePage();
    }

    render() {
        let postBody = <Spinner />;
        if (!this.state.loading && this.state.postBody) {
            postBody = (
                <Aux>
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-lg-8">
                                <h1 class="mt-4">{this.state.postBody.title}</h1>
                                <p class="lead">
                                    Atuhor : <Link to="/"> {this.state.postBody.author_full_name}</Link>
                                </p>
                                <p className="text"><b>Posted On</b> {new Date(
                                        this.state.postBody.published_on
                                    ).toDateString()}
                                </p>
                                <hr/>
                                 <Tags tagsList={this.state.tags}/>
                                <hr/>
                                

                                <img class="img-fluid rounded" src={"http://placehold.it/900x300"} alt=""/>
                                <hr/>
                                <p className="lead">
                                    {this.state.postBody.body}
                                </p>
                                <hr/>
                  
                                <h3 className="h3-responsive">
                                    Comments: {this.state.postBody.total_comments}
                                </h3>

                                <div class="card my-4">
                                    <h5 class="card-header">Leave a Comment:</h5>
                                    <div class="card-body">
                                        <form>
                                            <div class="form-group">
                                                <textarea class="form-control" rows="3"></textarea>
                                            </div>
                                            <button type="submit" class="btn btn-primary">Submit</button>
                                        </form>
                                    </div>
                                </div>

                                <div class="media mb-4">
                                    <img class="d-flex mr-3 rounded-circle" src={"http://placehold.it/50x50" }alt=""/>
                                    <div class="media-body">
                                        <h5 class="mt-0">Commenter Name</h5>
                                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                
                </Aux>
            );
        }

        return postBody;
    }
}

export default PostDetails;
