import React from "react";
import { Link } from "react-router-dom";


const Category = props => {
    
    return (

            <div class="card my-4">
                <h5 class="card-header">Categories</h5>
                <div class="card-body text-center">
                { props.tagsList.map(tag => (
                <>    
                    <Link to="/">
                        <p className="badge badge-dark text-white px-2 py-2 mx-1 my-1">
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
