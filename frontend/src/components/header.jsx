import React from "react";
import { NavLink ,Redirect} from "react-router-dom";
import Aux from "../hoc/Aux/Aux";
import * as actions from "../store/actions/index";


const Header = props => { 

    const logout=()=>{
        actions.logout();
        <Redirect to="/login" />
    }

       
    
    
        return (
            <nav class="navbar navbar-expand-lg navbar-light  fixed-top" id="mainNav">
                <div class="container">
                <NavLink class="navbar-brand text-dark" to="/">Meteorite</NavLink>
                <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i class="fas fa-bars"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <NavLink className="nav-link text-dark" to="/">Home</NavLink>
                    </li>
                    {props.isAuth ? (
                    <>
                    <li className="nav-item">
                        <NavLink className="nav-link text-dark" to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-dark" to="/login" onClick={logout}>Logout</NavLink>
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
