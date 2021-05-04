import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { addNewPost } from "./postsSlice";

export const AddPostForm = () => {
  const dispatch = useDispatch("");

  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [content, setContent] = useState("");
  const [addReqStatus, setAddReqStatus] = useState("idle");

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const users = useSelector(selectAllUsers);
  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  //
  const onSavePostClicked = async () => {
    if (title && content) {
      try {
        setAddReqStatus("pending");
        const resultAction = await dispatch(
          addNewPost({ title, content, user: userId })
        );
        unwrapResult(resultAction);
        setTitle("");
        setContent("");
        setUserId("");
      } catch (error) {
        console.error(error);
      } finally {
        setAddReqStatus("idle");
      }
    }
  };

  const canSave =
    [title, content, userId].every(Boolean) && addReqStatus === "idle";

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
        Save Post
      </button>
    </section>
  );
};
