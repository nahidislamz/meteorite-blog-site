import React, { Component } from "react";
import { connect } from "react-redux";
import AxiosInstance from "../../AxiosInstance";
import Aux from "../../hoc/Aux/Aux";
import * as actions from "../../store/actions/index";
import { withRouter } from "react-router-dom";
import {Link} from "react-router-dom";
var select="Select"

class PostEdit extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: "",
            body: "",
            thumbnail: null,
            tags: [],
            category:[]
        };
    }
    getTagsList = () => {
        AxiosInstance.get("blog/tags-list/")
            .then(response => {
                this.setState({ tags: response.data });
                //console.log(response.data);
            })
            .catch(error => {
                alert(error,"Error Loading tags. Try Again..!!");
            });
    };
    componentDidMount() {
        let slugID=this.props.match.params.slug;
        AxiosInstance.get("blog/details_view/" + slugID + "/")
        .then(response =>
            this.setState({
                title:  response.data.title,
                body: response.data.body,
                thumbnail: response.data.thumbnail,
                category:response.data.tags
            })
            
        )
        .catch(err => console.log("Error From PostDetail.js", err));
        
        this.getTagsList();
    }

    handleChange = (event) => {   
        this.setState({
           [event.target.id]:[event.target.value]
        });
         select="Selected"
    };
    onImageChange = (event)=>{
        this.setState({
            thumbnail:event.target.files[0],
        })
    }
    resetForm(){
        this.setState({
            title:  "",
            body:"",
            thumbnail: null,
            category:""
        })
    }

    onFormSubmitEventHandler = event => {
        event.preventDefault();
 
        let data = new FormData();
        data.append('slug', this.props.match.params.slug);
        data.append('title', this.state.title);
        data.append('thumbnail', this.state.thumbnail);
        data.append('body', this.state.body);
        data.append('tags',this.state.category);
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        this.props.onUserPostEdit(data, config);
    };

    render() {

        let form = <p className="text-center mt-5">Loading...</p>;
        if (this.state) {
            form = (
                <Aux>
                    <nav aria-label="breadcrumb mt-5 pt-5">
                        <ol class="breadcrumb mt-5">
                            <li class="breadcrumb-item"><Link to="/dashboard/post-list">Dashboard</Link></li>
                            <li class="breadcrumb-item active" aria-current="page">Posts-Edit</li>
                            <li class="breadcrumb-item active" aria-current="page">{this.state.title}</li>
                        </ol>
                    </nav>
                    <form onSubmit={this.onFormSubmitEventHandler}>
                    <div className="form-group mb-3">
                            <input type="text" id="title" className="form-control" placeholder="Title" 
                            value={this.state.title} onChange={this.handleChange} />
                        </div>
                       
                        <div className="form-group mb-3">
                            <textarea rows="10" id="body" className="form-control" placeholder="Write Your Content Here..." 
                            value={this.state.body} onChange={this.handleChange} />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="file">Thumbnail</label>
                            <input 
                                id="file"
                                accept="image/png,image/jpeg"
                                className="form-control-file"
                                type="file"
                                onChange={this.onImageChange} />
                        </div>

                        <div className="form-group mb-3">
                            <p className="py-3">Pick Your Category: </p>
                            {
                                <select 
                                    className="py-2 browser-default custom-select" 
                                    id="category" 
                                    onChange={this.handleChange} 
                                    value={this.state.tags}>
                                    <option className="selected" value={this.state.category}>{select} {this.state.category}</option>
                                    {this.state.tags.map(tag =>(
                                    <option value={tag.name}>{tag.name}</option>
                                    ))}
                                </select>
                           
                            }                      
                        </div>
                        <div className="form-group mb-3">
                            <input type="submit" className="btn btn-warning" value="Update Post" />
                        </div>
                    </form>
                </Aux>
            );
        }
        return this.props.loading ? (
            <p className="text-center mt-5">Loading...</p>
        ) : (
            <div className="container mt-5 py-3 px-3">{form}</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.user.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUserPostEdit: (updatedPost, config) =>
            dispatch(actions.userPostEdit(updatedPost, config))
    };
};

export default withRouter (connect(
    mapStateToProps,
    mapDispatchToProps
)(PostEdit));
