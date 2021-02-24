import React, { Component } from "react";

import AxiosInstance from "../../AxiosInstance";
import Spinner from "../ui/spinner";
import Aux from "../../hoc/Aux/Aux";


class PostDetails extends Component {
    state = {
        loading: true,
        postBody: null,
        comments: null
    };

    getPostBody = () => {
        AxiosInstance.get("blog/details_view/" + this.props.match.params.slug)
            .then(response =>
                this.setState({ loading: false, postBody: response.data })
            )
            .catch(err => console.log("Error From PostDetail.js", err));
    };



    renderWholePage = () => {
        this.getPostBody();
      
    };
    componentDidMount() {
        this.renderWholePage();
    }

    render() {
        let postBody = <Spinner />;
        if (!this.state.loading && this.state.postBody) {
            postBody = (
                <Aux>
                    <div className="container mt-5 py-5 px-5">
                        <div className="row">
                            <div className="col-lg-8 col-md-10 mx-auto">
                            <h1 className="h2">
                            {this.state.postBody.title}
                        </h1>
                        <p className="text">
                            {new Date(
                                this.state.postBody.published_on
                            ).toDateString()}
                        </p>
                        <hr/>
                        <p className="">
                            {this.state.postBody.body}
                        </p>
                        <hr/>
                        <div className="text-bold text-primary">
                            <p> <span className="text-dark">Author</span> - {this.state.postBody.author_full_name}</p>
                        </div>
                        <h3 className="h3-responsive">
                            Comments: {this.state.postBody.total_comments}
                        </h3>
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
