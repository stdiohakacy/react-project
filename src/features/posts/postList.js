import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, selectPostIds, selectPostById } from "./postsSlice";
import { selectUserById } from '../users/usersSlice'
import { formatDistanceToNow, parseISO } from "date-fns";
import { Link } from "react-router-dom";

const PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));
  const author = useSelector((state) => selectUserById(state, post.user));
  const date = parseISO(post.date);
  const timeAgo = formatDistanceToNow(date);

  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <span>{author ? author.name : "Unknown author!"}</span>
      <span title={post.date}>
        &nbsp; <i>{timeAgo} ago</i>
      </span>
      <p>{post.content.substring(0, 100)}</p>
      {/* <ReactionButtons post={post} /> */}
      <Link to={`/posts/${post.id}`} className="button">
        View Post
      </Link>
    </article>
  );
};

export const PostList = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const postIds = useSelector(selectPostIds);

  const orderedPostIds = postIds.slice().reverse();

  useEffect(() => {
    if (status === "idle") dispatch(fetchPosts());
  }, [status, dispatch]);

  let content;
  if (status === "loading") content = <div className="loader">Loading ...</div>;
  else if (status === "succeeded")
    content = orderedPostIds.map((postId) => (
      <PostExcerpt key={postId} postId={postId} />
    ));
  else if (status === "error") content = <div>{error}</div>;
  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};
