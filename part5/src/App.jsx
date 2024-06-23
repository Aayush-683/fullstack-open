import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import CreateNewBlogForm from "./components/CreateNewBlogForm";
import ToggleAble from "./components/ToggleAble";
import userService from "./services/user";
import Notification from "./components/Notification"; // Import the Notification component
import "./styles/App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem("uToken") || null);
  const [noti, setNotiMsg] = useState(null);

  window.onload = () => {
    if (token) {
      userService.getUser(token).then((user) => setUser(user));
    }
  };

  useEffect(() => {
    if (token) {
      blogService.getAll(token).then((blogs) => setBlogs(blogs));
    }
  }, [token]);

  const handleLogout = () => {
    window.localStorage.removeItem("uToken");
    setUser(null);
  };

  const deleteBlog = (blog) => {
    return async () => {
      if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
        try {
          await blogService.deleteBlog(blog.id, token);
          setBlogs(blogs.filter((b) => b.id !== blog.id));
          Notify("Blog deleted!", "success");
        } catch (err) {
          Notify("Failed to delete blog", "error");
          console.error(err);
        }
      }
    };
  };

  const likeBlog = (blog) => {
    return async () => {
      try {
        if (typeof blog.user === "object") blog.user = blog.user.id;
        await blogService.like(blog, token);
        setBlogs(blogs.map((b) => (b.id === blog.id ? { ...b, likes: b.likes + 1 } : b)));
        Notify("Liked blog!", "success");
        console.log(blogs);
      } catch (err) {
        Notify("Failed to like blog", "error");
        console.error(err);
      }
    };
  };

  const Notify = (message, type) => {
    console.log(message, type);
    setNotiMsg({ message, type });
    setTimeout(() => {
      setNotiMsg(null);
    }, 5000);
  };

  blogs.sort((a, b) => b.likes - a.likes);

  if (!(user && token)) {
    return (
      <>
        <Notification message={noti?.message} type={noti?.type} />
        <div>
          <h2>Login</h2>
          <LoginForm setUser={setUser} setToken={setToken} Notify={Notify} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <Notification message={noti?.message} type={noti?.type} />
        <div>
          <h3>
            Logged in as {user.username} <button onClick={handleLogout}>Logout</button>
          </h3>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              owner={user.id}
              deleteBlog={deleteBlog}
              likeBlog={likeBlog}
            />
          ))}
        </div>
        <div>
          <ToggleAble buttonLabel="Create new blog">
            <CreateNewBlogForm token={token} setBlogs={setBlogs} Notify={Notify} />
          </ToggleAble>
        </div>
      </>
    );
  }
};

export default App;
