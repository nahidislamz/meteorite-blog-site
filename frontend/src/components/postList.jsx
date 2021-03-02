import React from "react";
import Post from "./post/post";

const posts = props => {
    let postList = null
    if (props.postList.length > 0) {
        postList = props.postList.map(post => (
            <Post
                key={post.slug}
                slug={post.slug}
                title={post.title}
                thumbnail={post.thumbnail}
                datePublished={post.published_on}
                totalComments={post.total_comments}
                author={post.author_full_name}
            />
        ));
    } else {
        postList = (
            <div className='text-center mt-5 py-5 px-5'>No Posts Yet</div>
        )
    }
    return <div>{postList}</div>;
};

export default posts;
