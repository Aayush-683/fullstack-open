import userService from "../services/user";
import { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ setUser, setToken, Notify }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await userService.login({
        username,
        password,
      });

      window.localStorage.setItem("uToken", user.token);
      setUsername("");
      setPassword("");
      setUser(user);
      setToken(user.token);
    } catch (exception) {
        Notify("Invalid username or password", "error");
        console.error(exception);
    }
  };

  return (
    <form onSubmit={handleLogin} id="loginForm">
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  Notify: PropTypes.func.isRequired,
};

export default LoginForm;
