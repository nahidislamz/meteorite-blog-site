import React from "react";
import { Link, NavLink } from "react-router-dom";


const post = props => {

    return (
        <div className="post-preview">
            <Link to={"blog/details_view/" + props.slug}>
            <h2 className="post-title">
                {props.title}
            </h2>
            </Link>
            <p className="post-meta">Posted by
            <NavLink to="/"> {props.author}</NavLink>
            {" "}Published on
            {new Date(props.datePublished).toDateString()}</p>
        </div>

    );
};

export default post;
