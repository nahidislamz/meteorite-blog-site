import React, { Component } from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import * as actions from "../../../store/actions/index";
import AxiosInstance from "../../../AxiosInstance";
import Aux from "../../../hoc/Aux/Aux";
import '../css/styles.css'
var select="Select"
class EditPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            body: "",
            thumbnail: null,
            is_published: false,
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
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };

        AxiosInstance.get(
            "/meteorite_admin/posts/view/" + this.props.match.params.slug + "/",config
        )
        .then(response => {
            this.setState({
                title: response.data.title,
                body: response.data.body,
                is_published: response.data.is_published,
                
            });
        })
        .catch(error => {
            alert("Something Went Wrong");
        });
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
 

    onFormSubmitEventHandler = event => {
        event.preventDefault();
 
        let data = new FormData();
        data.append('slug', this.props.match.params.slug);
        data.append('title', this.state.title);
        data.append('thumbnail', this.state.thumbnail);
        data.append('body', this.state.body);
        data.append('is_published', true);
        const config = {
            headers: {
                "Content-Type": "application/json",
                AUTHORIZATION: "JWT " + this.props.token
            }
        };
        this.props.onAdminEditPost(data, config);
    };

    render() {


        let form =  <p className="text-primary text-center mt-5 py-5">Loading...</p>;
        if (this.state) {
            form = (
                <Aux>
                    <nav aria-label="breadcrumb mt-4 pt-5">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to="/admin-panel">Dashboard</Link></li>
                            <li class="breadcrumb-item active" aria-current="page"><Link to="/admin-panel/post-list">Posts</Link> </li>
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
            <p className="text-primary text-center mt-5 py-5">Loading...</p>
        ) : (
            <div className="container mt-5 pt-5">{form}</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.admin.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAdminEditPost: (config, slug) =>
            dispatch(actions.adminEditPost(config, slug))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPost);
