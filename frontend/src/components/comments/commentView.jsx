import React from "react";

const comment = props => {
    return (
        
        <div className="media my-4 border border-rounded p-3">
            <img className="d-flex mr-3 rounded-circle border" width={50} src={"http://127.0.0.1:8000"+props.author_profile} alt=""/>
            <div className="media-body">
                <h5 className="mt-0 text-dark">{props.author_full_name}</h5>
                <p className="m-0 px-2">{props.body}</p>
            </div>
            <div className="text-dark">
                
                <small><strong>On:</strong>{" "}{new Date(props.publishedOn).toDateString()}</small>
            </div>
        </div>
    );
};

export default comment;
