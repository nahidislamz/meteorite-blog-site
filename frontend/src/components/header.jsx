import React from "react";
import { NavLink } from "react-router-dom";
import Aux from "../hoc/Aux/Aux";
import * as actions from "../store/actions/index";
import "./ui/css/dropdown.css"
import "./ui/css/logo.css"
const Header = props => { 

    const logout=()=>{
        actions.logout();
        window.location.reload();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark mdb-color lighten-5  fixed-top" id="mainNav">
            <div className="container">
            <a className="navbar-brand text-dark m-logo" href="/">M</a>
            <button className="navbar-toggler navbar-toggler-right" type="button" 
            data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                Menu
                <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
            
                {props.isAuth ? (
                <>
                <li className="nav-item">
                    <NavLink className="nav-link text-dark pt-2" to="/new-post">
                        <span style={{fontSize:10}}>new post</span>
                        <i style={{fontSize: "22px",}} className="pl-1 fas fa-plus-circle"></i>
                    </NavLink>
                </li>
                 <li className="nav-item dropdown">
                    <a style={{padding:2,}} href="#!">
                    <i  style={{fontSize:20, marginTop:6}} className="fas fa-user text-dark"></i>
                    </a>
                    <ul className="dropdown-content">
                        <li>
                            <NavLink style={{fontSize: "16px",fontWeight:'bold'}} className="dropdown-link text-dark" to="/profile"><i className="fas fa-user-circle"></i> Profile</NavLink>
                        </li>
                        <li>
                            <NavLink style={{fontSize: "16px",fontWeight:'bold'}} className="dropdown-link text-dark" to="/dashboard/post-list"><i className="fas fa-tachometer-alt"></i> Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink style={{fontSize: "16px",fontWeight:'bold'}} className="dropdown-link text-dark" to="/" onClick={logout}><i className="fas fa-sign-out-alt"></i> Logout</NavLink>
                        </li>
                    </ul>
                </li>
     
                </>
                ):(
                <Aux>
                    <li className="nav-item">
                        <NavLink className="nav-link text-dark" to="/login" exact >Login</NavLink>
                    </li>
                </Aux>
                )}
                </ul>
            </div>
            </div>
        </nav>
    
    );
};

export default Header;
