import React from "react";
import { Link } from "react-router-dom";
import banner from "../ui/image/banner.jpg"

const post = props => {

    return (
        <div class="card mb-4">  
            <img className="banner card-img-top" src={banner} alt={"banner"} width="150" height="250"/>
            <div class="card-body">
                <h2 className="card-title">
                    {props.title}
                </h2>
                <Link to={"blog/details_view/" + props.slug}>
                    <button class="btn btn-primary">Read More &rarr;</button>
                </Link>   
                <div class="card-footer text-muted mt-2">
                    Posted on {new Date(props.datePublished).toDateString()} by
                    <Link to="/"> {props.author}</Link>
                </div>
            </div>
        </div>

    );
};

export default post;
