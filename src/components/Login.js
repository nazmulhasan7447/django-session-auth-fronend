import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import CSRFToken from "./auth/CSRFToken";
import { useAuth } from "./auth/Authentication";
import BASE_URL from "./auth/BaseURL";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const csrfToken = Cookies.get("csrftoken");
  const initialCredentials = Object.freeze({
    email: "",
    username: "",
    password: "",
  });

  const authStatus = useAuth();

  const [loginCredential, setLoginCredentials] = useState(initialCredentials);

  const onChangeHandler = (e) => {
    console.log(e.target.value);
    setLoginCredentials({
      ...loginCredential,
      [e.target.name]: e.target.value,
    });
  };

  const LoginRequestHanlder = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/login-user/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify(loginCredential),
    });
    const data = await response.json();
    console.log(data);
    if (data?.success) {
      navigate("/dashboard", { replace: true });
    } else {
      enqueueSnackbar(data?.message, { variant: "warning" });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <form className="login-form" onSubmit={(e) => LoginRequestHanlder(e)}>
            {/* <CSRFToken /> */}
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
                name="email"
                onChange={onChangeHandler}
              />
            </div>

            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Username"
                name="username"
                onChange={onChangeHandler}
              />
            </div>

            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Password"
                name="password"
                onChange={onChangeHandler}
              />
            </div>

            <div className="mb-3">
              <button type="submit" class="btn form-control btn-primary mb-3">
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default Login;
