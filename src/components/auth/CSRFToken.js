import React, { useState, useEffect } from "react";
import { useAuth } from "./Authentication";
import axios from "axios";
import Cookies from "js-cookie";
import BASE_URL from "./BaseURL";

const CSRFToken = () => {
  const authValues = useAuth();

  const getCookie = (name) => {
    let cookieValue = null;

    if (document.cookie && document.cookie !== "") {
      let cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const getCSRF = () => {
    fetch(`${BASE_URL}/api/csrf/`, {
      credentials: "include",
    })
      .then((res) => {
        let csrfToken = res.headers.get("X-CSRFToken");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get(
    //       "http://127.0.0.1:8000/get-csrf-token/"
    //     );
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchData();
    getCSRF();
    // authValues?.setCSRFToken(getCookie("csrftoken"));
  }, []);
  return (
    <input
      type="hidden"
      name="csrfmiddlewaretoken"
      value={authValues?.csrfToken}
    />
  );
};

export default CSRFToken;
