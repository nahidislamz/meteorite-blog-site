import React from "react";
import avater from "../ui/image/avater.png"

const comment = props => {
    return (
        <div className="media mb-4">
            <img className="d-flex mr-3 rounded-circle" src={avater}alt=""/>
            <div className="media-body">
                <h5 className="mt-0 text-dark">{props.author_full_name}</h5>
                {props.body}
            </div>
            <div className="text-dark">
                <strong>On:</strong>{" "}
                {new Date(props.publishedOn).toDateString()}
            </div>
        </div>
    );
};

export default comment;
