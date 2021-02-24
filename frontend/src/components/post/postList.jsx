// Post List For Homepage
import React, { Component } from "react";
import AxiosInstance from "../../AxiosInstance";
import Spinner from "../ui/spinner";
import Post from "../post"


class PostList extends Component {
    state = {
        posts: null,
        loading: true
    };

    componentWillMount() {
        AxiosInstance.get("blog/")
            .then(response =>
                this.setState({ posts: response.data, loading: false })
            )
            .catch(err => console.log("Error From PostList.js", err));
    }

    render() {

        let postList = <Spinner />;
        if (!this.state.loading && this.state.posts) {
            postList = <Post postList={this.state.posts} />
            console.log(postList)

        }
        return (
            <div className='container mt-4'>
                <div class="row">
                    <div class="col-lg-8 col-md-10 mx-auto my-4 py-2">{postList}</div>
                </div>
            </div>
        );
    }
}

export default PostList;
