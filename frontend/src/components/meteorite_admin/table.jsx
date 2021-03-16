import React from "react";
import "./css/styles.css"
import SideBar from "./sidebar";
import { Link } from "react-router-dom";
const AdminDashboard = props => { 

    return (
        <>
        <div id="layoutSidenav">
            <SideBar/>
            
            <div id="layoutSidenav_content">
                <main>
                    <div className="container-fluid">
                        <h1 className="mt-4">Dashboard</h1>
                        <ol className="breadcrumb mb-4">
                            <li class="breadcrumb-item"><Link to="/admin-panel">Dashboard</Link></li>
                            <li className="breadcrumb-item active">{props.name}</li>
                        </ol>
                    
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card mb-4">
                                    <div className="card-header">
                                       <h4>{props.name} Lists</h4>
                                    </div>
                                    <div className="card-body">
                                        {props.List}
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    
                    </div>
                </main>
            </div>
        </div>
        </>
    
    );
};

export default AdminDashboard;


