import React from "react";
import { Link } from "react-router-dom";


const Category = props => {
    
    return (

            <div className="card my-4">
                <h5 className="card-header">Categories</h5>
                <div className="card-body text-center">
                { props.tagsList.map(tag => (
                <>    
                    <Link to="/">
                        <p key={tag.pk} className="badge badge-pill badge-defaultbadge badge-pill badge-default text-white px-2 py-2 mx-1 my-1">
                            {tag.name}
                        </p>
                    </Link>
                </>
                ))}
                </div>
            </div>

    );
};

export default Category;
