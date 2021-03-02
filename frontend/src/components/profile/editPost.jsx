import React, { Component } from "react";
import { connect } from "react-redux";
import AxiosInstance from "../../AxiosInstance";
import Aux from "../../hoc/Aux/Aux";
import * as actions from "../../store/actions/index";
import { withRouter } from "react-router-dom";

class PostEdit extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: "",
            body: "",
            thumbnail: null,
        };
    }
    componentDidMount() {
        let slugID=this.props.match.params.slug;
        AxiosInstance.get("blog/details_view/" + slugID + "/")
        .then(response =>
            this.setState({
                title:  response.data.title,
                body: response.data.body,
                thumbnail: response.data.thumbnail,
            })
           
        )
        .catch(err => console.log("Error From PostDetail.js", err));
    }

    handleChange = (event) => {   
        this.setState({
           [event.target.id]:[event.target.value]
        });
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
                    <h1 className="text-center py-3"
                        style={{
                            fontFamily: "Roboto, sans-serif",
                            fontWeight: "200"
                        }}
                    >
                        Edit Post
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
                            <input type="submit" className="btn btn-warning" value="Update Post" />
                        </div>
                    </form>
                </Aux>
            );
        }
        return this.props.loading ? (
            <p className="text-center mt-5">Loading...</p>
        ) : (
            <div className="container mt-5">{form}</div>
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
