import React from "react";
const Card = props => {

    return (

        <div className="row">

            <div className="col-xl-4 col-md-6">
                <div className="card bg-info text-center text-white mb-4">
                    <div className="card-body" style={{fontSize:'20px',fontWeight:"bold"}}>Total Users</div>
                    <p style={{fontSize:'25px',fontWeight:"bold"}} className="text-white">32</p>
                </div>
            </div>

            <div className="col-xl-4 col-md-6">
                <div className="card bg-warning text-center text-white mb-4">
                    <div className="card-body" style={{fontSize:'20px',fontWeight:"bold"}}>Total Posts</div>
                    <p style={{fontSize:'25px',fontWeight:"bold"}} className="text-white">12</p>
                </div>
            </div>

            <div className="col-xl-4 col-md-6">
                <div className="card bg-success text-center text-white mb-4">
                    <div className="card-body" style={{fontSize:'20px',fontWeight:"bold"}}>Total Comments</div>
                    <p style={{fontSize:'25px',fontWeight:"bold"}} className="text-white">20</p>
                </div>
            </div>
        
        </div>
    );
};

export default Card;
