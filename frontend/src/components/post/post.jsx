import React from "react";
import { Link } from "react-router-dom";


const post = props => {

    return (
        <div className="card mb-4">  
            <img className="banner card-img-top" src={props.thumbnail} alt={"banner"} width="150" height="250"/>
            <div className="card-body">
                <h2 className="card-title">
                    {props.title}
                </h2>
                <Link to={"blog/details_view/" + props.slug}>
                    <button className="btn btn-sm btn-pink darken-4">Read More &rarr;</button>
                </Link>   
                <div className="card-footer text-muted mt-2">
                    Posted on {new Date(props.datePublished).toDateString()} by
                    <Link to="/"> {props.author}</Link>
                </div>
            </div>
        </div>

    );
};

export default post;
