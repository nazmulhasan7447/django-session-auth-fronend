import { useEffect, useState } from "react";
import { Navigate, useNavigate, Navi } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useAuth } from "./auth/Authentication";
import BASE_URL from "./auth/BaseURL";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const authValues = useAuth();

  const navigate = useNavigate();

  const initialCredentials = Object.freeze({
    email: "",
    username: "",
    password: "",
    confirmPass: "",
  });

  const [userInformation, setUserInformation] = useState(initialCredentials);

  const onChangeHandler = (e) => {
    setUserInformation({ ...userInformation, [e.target.name]: e.target.value });
  };

  const handleRegistration = (e) => {
    e.preventDefault();

    const userRegisterRequestHandler = async () => {
      const response = await fetch(`${BASE_URL}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": authValues?.csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(userInformation),
      });
      const data = await response.json();
      if (!data?.success) {
        enqueueSnackbar(data?.message, { variant: "warning" });
      } else {
        enqueueSnackbar(data?.message, { variant: "success" });
        navigate("/login", { replace: true });
      }
    };

    userRegisterRequestHandler();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="login-form">
            <form onSubmit={(e) => handleRegistration(e)}>
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
                <label for="exampleFormControlInput1" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Confirm password"
                  name="confirmPass"
                  onChange={onChangeHandler}
                />
              </div>

              <div className="mb-3">
                <button type="submit" class="btn form-control btn-primary mb-3">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default Register;
