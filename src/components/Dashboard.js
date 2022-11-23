import { useSnackbar } from "notistack";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "./auth/Authentication";
import BASE_URL from "./auth/BaseURL";

const Dashboard = () => {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const authStatus = useAuth();
  if (!authStatus?.currentUserInfo?.isAuthenticated) {
    return <Navigate to="/" />;
  }

  const logoutUser = async () => {
    try {
      const response = await fetch(`${BASE_URL}/logout-user/`, {
        credentials: "include",
      }).then((response) => {
        authStatus?.setCurrentUserInfo({
          ...authStatus?.currentUserInfo,
          isAuthenticated: false,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="card text-center mt-5">
            <div className="card-body">
              <h3 className="card-title">
                Welcome to dashboard{" "}
                <strong>{authStatus?.currentUserInfo?.username}</strong>
              </h3>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a
                type="button"
                className="btn btn-primary"
                onClick={() => logoutUser()}
              >
                Logout
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default Dashboard;
