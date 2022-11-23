import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import BASE_URL from "./BaseURL";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [csrfToken, setCSRFToken] = useState(Cookies.get("csrftoken"));
  const [currentUserInfo, setCurrentUserInfo] = useState({
    isAuthenticated: false,
    username: "",
  });

  useEffect(() => {
    const isCurrentUserAuthenticated = async () => {
      const getCsrf = await fetch(`${BASE_URL}/get-csrf-token/`, {
        credentials: "include",
      })
        .then((response) => console.log())
        .catch((error) => console.log());

      const response = await fetch(`${BASE_URL}/check-authenticated/`, {
        // method: "get",
        // headers: {
        //   "Content-Type": "application/json",
        //   "X-CSRFToken": csrfToken,
        // },
        credentials: "include",
      });
      const data = await response.json();

      if (data?.isAuthenticated) {
        setCurrentUserInfo({
          ...currentUserInfo,
          isAuthenticated: true,
          username: data?.username,
        });
      }
    };
    isCurrentUserAuthenticated();
  }, []);

  return (
    <AuthContext.Provider
      value={{ csrfToken, setCSRFToken, currentUserInfo, setCurrentUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
