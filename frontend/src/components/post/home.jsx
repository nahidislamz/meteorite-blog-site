// Post List For Homepage
import React, { Component } from "react";
import AxiosInstance from "../../AxiosInstance";
import Post from "../postList"
import Search from "./search"
import Categories from "./category"
import Widgets from "./widget"
let URL_BLOG ="blog/"
class Home extends Component {
    state = {
        posts: [],
        links: '',
        loading: true,
        tags: [],
    };    
    prevPage = () => {
        let toPage = this.state.links.previous
        URL_BLOG = "blog/?"+toPage
        console.log(URL_BLOG);
        this.loadPosts(toPage);
        //window.location.reload();
        
    }

    nextPage = () => {
        let toPage = this.state.links.next
        URL_BLOG = "blog/?"+toPage
        console.log(URL_BLOG);
        this.loadPosts(toPage); 
        //window.location.reload();
    }
    getTagsList = () => {
        AxiosInstance.get("blog/tags-list/")
            .then(response => {
                this.setState({ tags: response.data });
            })
            .catch(error => {
                alert(error,"Error Loading tags. Try Again..!!");
            });
    };

    loadPosts = async () => {
        await  AxiosInstance.get(URL_BLOG)
            .then((res) => {
                console.log(res.data);
                const posts = res.data.results
                this.setState({
                    posts,
                    links: res.data.links,
                    loading: false 
                })

            }).catch(err => console.log("Error From Home.js", err));
    }
    componentDidMount() {
        this.getTagsList();
        this.loadPosts();
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
                     
                            <button  disabled={this.state.links.previous === null}  
                            className="btn btn-sm btn-pink darken-3" onClick={this.prevPage}>&larr;</button>
                
                            <button className="btn btn-sm btn-pink darken-3"
                                disabled={this.state.links.next === null}
                                onClick={this.nextPage}> &rarr;</button>
                           
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
