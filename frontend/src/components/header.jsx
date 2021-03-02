import React from "react";
import { NavLink } from "react-router-dom";
import Aux from "../hoc/Aux/Aux";
import * as actions from "../store/actions/index";
import "./ui/css/dropdown.css"
import avater from "../components/ui/image/avater.png"
import createnew from "../components/ui/image/create-new.jpg"
const Header = props => { 

    const logout=()=>{
        actions.logout();
        window.location.reload();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light  fixed-top" id="mainNav">
            <div className="container">
            <NavLink className="navbar-brand text-dark" to="/">Meteorite</NavLink>
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
                    <NavLink className="nav-link text-dark" to="/new-post">new post
                    <img
                        src={createnew}
                        className="rounded-circle px-1"
                        height="25"
                        alt=""
                        loading="lazy"
                    />
                    </NavLink>
                </li>
                 <li className="nav-item dropdown">
                    <a
                    className="nav-link d-flex align-items-center"
                    href="#!"
                    >
                    <img
                        src={avater}
                        className="rounded-circle"
                        height="25"
                        alt=""
                        loading="lazy"
                    />
                    </a>
                    <ul className="dropdown-content">
                        <li>
                            <NavLink className="dropdown-link text-dark" to="/profile">Profile</NavLink>
                        </li>
                        <li>
                            <NavLink className="dropdown-link text-dark" to="/dashboard/post-list">Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink className="dropdown-link text-dark" to="/" onClick={logout}>Logout</NavLink>
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
