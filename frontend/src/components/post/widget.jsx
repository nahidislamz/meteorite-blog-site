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
                            <div className="d-flex w-100 justify-content-between">
                                <li key={post.id} className="list-group-item">{post.title}</li>
                            </div>
                        </Link>   
                    </Aux>
                ))}
            </ul>
           
        </div>

    );
};

export default Widgets;
