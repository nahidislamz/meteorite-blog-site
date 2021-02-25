import React from "react";
import Aux from "../../hoc/Aux/Aux";

const Tags = props => {

    return props.tagsList.map(tag => (
        <Aux>
            <p className="badge badge-danger mx-1">{tag.name}</p>
        </Aux>
    ));
};

export default Tags;
