// Post List For Homepage
import React, { Component } from "react";
import AxiosInstance from "../../AxiosInstance";
import Post from "../postList"

import Categories from "./category"
import Widgets from "./widget"
let URL_BLOG ="blog/"
class Home extends Component {
    state = {
        posts: [],
        links: '',
        loading: true,
        tags: [],
        search:''
    };    
    prevPage = () => {
        let toPage = this.state.links.previous
        URL_BLOG = "blog/?"+toPage
        this.loadPosts(toPage);
        //window.location.reload();
        
    }
    handleSearch=(e)=>{
        this.setState({
            search: e.target.value
          })
    }
    nextPage = () => {
        let toPage = this.state.links.next
        URL_BLOG = "blog/?"+toPage
        this.loadPosts(toPage); 
        //window.location.reload();
    }
    onSearch = () => {
        let search= this.state.search
        this.getSearchList(search)
       
       
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
    
    getSearchList = (search) => {
        AxiosInstance.get("blog/search/?search="+search)
            .then(response => {
                this.setState({ posts: response.data });
            })
            .catch(error => {
                alert(error,"Error Loading tags. Try Again..!!");
        }); 
    };


    loadPosts = async () => {
        await  AxiosInstance.get(URL_BLOG)
            .then((res) => {
               
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
                            className="btn btn-sm btn-danger" onClick={this.prevPage}>&larr;Prev</button>
                
                            <button className="btn btn-sm btn-success"
                                disabled={this.state.links.next === null}
                                onClick={this.nextPage}> &rarr;Next</button>
                           
                        </ul>
                    </div>

                    {/* 2nd column */}
                        <div className="col-md-4 mt-5 pt-5">
                            <div className="card my-4">
                                <h5 className="card-header">Search</h5>
                                <div className="card-body">
                                    <div className="input-group">
                                        <input type="text" className="form-control m-0 border"
                                            value={this.state.search}
                                            onChange={this.handleSearch} 
                                            placeholder="Search Here..."/>
                                        <span className="input-group-append">
                                            <button className="btn btn-sm btn-secondary m-0" 
                                                    onClick={this.onSearch}
                                                    type="button"><i className="fas fa-search"></i></button>
                                        </span>
                                    </div>
                                </div>
                        </div>
                        <Categories tagsList={this.state.tags}/>
                        <Widgets postList={this.state.posts} title="Popular Posts"/>
                    </div>

                </div>
          
            </div>
        );
    }
}

export default Home;
