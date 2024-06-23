import React, { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const CreateNewBlogForm = ({ token, setBlogs, Notify }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      const blog = await blogService.createNew({ title, author, url }, token);
      setTitle("");
      setAuthor("");
      setUrl("");
      setBlogs((prev) => [...prev, blog]);
      Notify("New blog created!", "success");
    } catch (err) {
      Notify("Failed to create new blog", "error");
      console.error(err);
    }
  };

  return (
    <>
      <div id="new_blog_form">
        <h2>Create new blog</h2>
        <form onSubmit={handleCreate} id="new_blog">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
          <br />
          <label htmlFor="author">Author</label>
          <input
            id="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
          <br />
          <label htmlFor="url">URL</label>
          <input
            id="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
          <br />
          <button type="submit">Create</button>
        </form>
      </div>
    </>
  );
};

CreateNewBlogForm.propTypes = {
  token: PropTypes.string.isRequired,
  setBlogs: PropTypes.func.isRequired,
  Notify: PropTypes.func.isRequired,
};

export default CreateNewBlogForm;
