// Post List For Homepage
import React, { Component } from "react";
import AxiosInstance from "../../AxiosInstance";
import Post from "../postList"
import Search from "./search"
import Categories from "./category"
import Widgets from "./widget"
class Home extends Component {
    state = {
        posts: [],
        loading: true,
        tags: [],
    };    
    getTagsList = () => {
        AxiosInstance.get("blog/tags-list/")
            .then(response => {
                this.setState({ tags: response.data });
            })
            .catch(error => {
                alert(error,"Error Loading tags. Try Again..!!");
            });
    };
    componentDidMount() {
        this.getTagsList()
    }
    componentWillMount() {
        AxiosInstance.get("blog/")
            .then(response =>{
                this.setState({ posts: response.data, loading: false });
            })
            .catch(err => console.log("Error From Home.js", err));
    }

    render() {

        let postList = <p className="text-center mt-5">Loading...</p>;

        if (!this.state.loading && this.state.posts) {
            postList = <Post postList={this.state.posts} />
          
        }
        return (
            <div className='container mt-4'>
                <div className="row">
                    {/*1st column*/ }
                    <div className="col-md-8">
                        <h3 className="my-5 pt-5">Latest Post</h3>
                            {postList}
                        <ul className="pagination justify-content-center mb-4">
                            <li className="page-item">
                                <a className="page-link" href="#!">&larr; Older</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#!"> 1</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#!"> 2</a>
                            </li>
                            <li className="page-item disabled">
                                <a className="page-link" href="#!">Newer &rarr;</a>
                            </li>
                        </ul>
                    </div>
                    {/* 2nd column */}
                    <div className="col-md-4 mt-5 pt-5">
                        <Search/>
                        <Categories tagsList={this.state.tags}/>
                        <Widgets postList={this.state.posts} title="Popular Posts"/>
                    </div>

                </div>
          
            </div>
        );
    }
}

export default Home;
