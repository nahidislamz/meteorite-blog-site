import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Aux/Aux";
import * as actions from "../../store/actions/index";
import AxiosInstance from "../../AxiosInstance"
class CreatePost extends Component {
    state = {       
        title: "",
        body: "",
        thumbnail:null,
        tags: [],
        is_published:false,
        tagList:[],
        
    };

    

    getTagsList = () => {
        AxiosInstance.get("blog/tags-list/")
            .then(response => {
                this.setState({ tags: response.data });
                console.log(response.data);
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
        data.append('tags',this.state.tagList);
        data.append('is_published',true);
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        this.props.onCreateNewPost(data, config);
    };

    handleChange = (event) => {
        this.setState({
          [event.target.id]: event.target.value
        })
      };

    onImageChange = (event)=>{
        this.setState({
            thumbnail:event.target.files[0],
        })
    }
    onCheckboxChange = (event)=>{
        let tagsArray=[];
        let isChecked = event.target.checked
        var name = event.target.value
        console.log(isChecked)
        
        if(isChecked){
            tagsArray.push(name)
        }
        this.setState({
            tagList:  tagsArray
        })
                
            console.log(this.state.tagList)
        
    }
    render() {
   
        let form = <p className="text-center">Loading...</p>
        if (this.state) {
        
            form = (
                <Aux>
                    <h1
                        style={{
                            fontFamily: "Roboto, sans-serif",
                            fontWeight: "200"
                        }}
                    >
                        Create A New Post
                    </h1>
                    <form onSubmit={this.onFormSubmitEventHandler}>
                        <div className="form-group mb-3">
                            <input type="text" id="title" className="form-control" placeholder="Title" 
                            value={this.state.title} onChange={this.handleChange} />
                        </div>
                       
                        <div className="form-group mb-3">
                            <textarea  id="body" className="form-control" placeholder="Write Your Content Here..." 
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
                            {
                            <p className="">Pick Your Tags:  <span className="mx-2"> </span>{this.state.tags.map(tag =>(
                                <>
                                    <input type="checkbox" value={tag.name} onChange={this.onCheckboxChange}/>
                                    <span className="badge badge-secondary mx-1 py-1">{tag.name}</span>
                                </>
                            ))}
                            </p>
                            }
                           
                        </div>
                        <div className="form-group mb-3">
                            <input type="submit" className="btn btn-primary" value="Post" />
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
