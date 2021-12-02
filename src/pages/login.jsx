import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axios } from "../utils";
import { Box, Typography } from "@mui/material";
import { TextField, GradientButton } from "../components";

import loginImage from "../assets/images/illustration-login.png";

const Page = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async () => {
    const response = await axios.post("sign-in", {
      mobileNo: userName,
      password,
    });
    const {
      accessToken,
      refreshToken,
      user: { name },
    } = response.data;
    localStorage.setItem("accessToken", accessToken);
    navigate("/");
  };
  return (
    <>
      <TextField
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <GradientButton onClick={loginHandler}>Login</GradientButton>
    </>
  );
};

export default Page;
