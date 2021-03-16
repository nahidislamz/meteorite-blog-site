import React from "react";
import { NavLink } from "react-router-dom";
const SideBar = props => {

    return (

            <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion bg-light" id="sidenavAccordion">
                    <div className="px-2 py-3" style={{fontSize:'26px',fontWeight:600,textAlign:'center'}}>Meteorite Admin</div>
                    <div className="sb-sidenav-menu">
                        <div className="nav">

                            <a className="nav-link" href="/admin-panel">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Dashboard
                            </a>

                            <a className="nav-link collapsed" href="!#" data-toggle="collapse" data-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                Blog
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <NavLink className="nav-link" to="/admin-panel/post-list">Posts</NavLink>
                                    <NavLink className="nav-link" to="/admin-panel/comment-list">Comments</NavLink>
                                </nav>
                            </div>
                            <a className="nav-link collapsed" href="!#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                <div className="sb-nav-link-icon"><i className="fas fa-user-circle"></i></div>
                                Accounts
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                    <NavLink className="nav-link" to="/admin-panel/user-create">Add New User</NavLink>
                                    <NavLink className="nav-link" to="/admin-panel/user-list">Users</NavLink>
                                    
                                </nav>
                            </div>
                        
                        
                        
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                        Nahid Islam
                    </div>
                </nav>
            </div>
      

    );
};

export default SideBar;
