import React from "react";
import { Link } from "react-router-dom";


const Category = props => {

    return (

            <div class="card my-4">
                <h5 class="card-header">Categories</h5>
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-6">
                            <ul class="list-unstyled mb-0">
                                <li>
                                    <Link to="/">Web Design</Link>
                                </li>
                                <li>
                                    <Link to="/">HTML</Link>
                                </li>
                                <li>
                                    <Link to="/">Freebies</Link>
                                </li>
                            </ul>
                        </div>
                        <div class="col-lg-6">
                            <ul class="list-unstyled mb-0">
                                <li>
                                    <Link to="/">JavaScript</Link>
                                </li>
                                <li>
                                    <Link to="/">CSS</Link>
                                </li>
                                <li>
                                    <Link to="/">Tutorials</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

    );
};

export default Category;
