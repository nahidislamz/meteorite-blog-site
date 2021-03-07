import React from "react";

import Comment from "./commentView";
import Aux from "../../hoc/Aux/Aux";

const comments = props => {
    return props.commentsList.map(comment => (
        <Aux key={comment.published_on}>
            <Comment
                author_profile={comment.author_profile}
                author_full_name={comment.author_full_name}
                body={comment.body}
                publishedOn={comment.published_on}
            />
        </Aux>
    ));
};

export default comments;
