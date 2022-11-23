import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./auth/Authentication";

const Navbar = () => {
  const authStatus = useAuth();
  // console.log(authStatus);

  return (
    <React.Fragment>
      <div className="container">
        <ul className="nav justify-content-center">
          <li className="nav-item">
            {authStatus?.currentUserInfo?.isAuthenticated ? (
              <Link className="nav-link active" to="/dashboard">
                Dashboard
              </Link>
            ) : (
              ""
            )}
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
