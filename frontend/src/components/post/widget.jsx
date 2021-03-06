import React from "react";
import Aux from "../../hoc/Aux/Aux";
import { Link } from "react-router-dom";

const Widgets = props => {

    return (
        <div className="card my-4">
            <h5 className="card-header">{props.title}</h5>
            <ul className="list-group">
                {props.postList.map(post => (
                    <Aux>
                        <Link to={"blog/details_view/" + post.slug}>
                            <li key={post.id} className="list-group-item">{post.title}</li>
                        </Link>   
                    </Aux>
                ))}
            </ul>
           
        </div>

    );
};

export default Widgets;
