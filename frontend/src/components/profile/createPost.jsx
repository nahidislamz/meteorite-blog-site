import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Aux/Aux";
import * as actions from "../../store/actions/index";
import AxiosInstance from "../../AxiosInstance"
var select="Select"
class CreatePost extends Component {
    state = {       
        title: "",
        body: "",
        thumbnail:null,
        tags: [],
        is_published:false,
        category:[]
        
    };

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
        this.getTagsList()
    }

    onFormSubmitEventHandler = event => {
        event.preventDefault();
        let data = new FormData();
        data.append('title', this.state.title);
        data.append('thumbnail', this.state.thumbnail);
        data.append('body', this.state.body);
        data.append('tags',this.state.category);
        data.append('is_published',true);
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        this.props.onCreateNewPost(data, config);
        this.resetForm();
        window.location.replace('/dashboard/post-list')
    };

    resetForm(){
        this.setState({
            title:  "",
            body:"",
            thumbnail: null,
            category:""
        })
    }

    handleChange = (event) => {
        this.setState({
          [event.target.id]: event.target.value
        })
        console.log(event.target.value)
        select="Selected"
      };

    onImageChange = (event)=>{
        this.setState({
            thumbnail:event.target.files[0],
        })
    }
 

    render() {
      
        let form = <p className="text-center">Loading...</p>
        if (this.state) {
        
            form = (
                <Aux>
                    <h1 className="h3-responsive my-4">Create A New Post
                    </h1>
                    <form onSubmit={this.onFormSubmitEventHandler}>
                        <div className="form-group mb-3">
                            <input type="text" id="title" 
                                    className="form-control" 
                                    placeholder="Title" 
                                    value={this.state.title} 
                                    onChange={this.handleChange} 
                                    maxLength = "50"
                                    required/>
                        </div>
                       
                        <div className="form-group mb-3">
                            <textarea rows="10"  id="body" 
                            className="form-control" 
                            placeholder="Write Your Content Here..." 
                            value={this.state.body} 
                            onChange={this.handleChange} 
                            required/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="file">Thumbnail</label>
                            <input 
                                required
                                id="file"
                                accept="image/png,image/jpeg"
                                className="form-control-file"
                                type="file"
                                onChange={this.onImageChange} />
                        </div>
                        <div className="form-group mb-3">
                            <p className="py-1">Pick Your Category: </p>
                            {
                                <select 
                                    required
                                    className="mb-2 browser-default custom-select" 
                                    id="category" 
                                    onChange={this.handleChange} 
                                    value={this.state.tags}>
                                    <option className="selected" value={this.state.category}>{select}: {this.state.category}</option>
                                    {this.state.tags.map(tag =>(
                                    <option value={tag.name}>{tag.name}</option>
                                    ))}
                                </select>
                           
                            }                      
                        </div>
                        <div className="form-group mb-3">
                            <input type="submit" className="btn btn-pink darken-4" value="Post" />
                        </div>
                    </form>
                </Aux>
            );
        }

        return(
            <div className="container mt-5 pt-5">{form}</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.post.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateNewPost: (postData, config) =>
            dispatch(actions.sendNewPostToServer(postData, config))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreatePost);
