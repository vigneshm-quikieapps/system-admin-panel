import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { styled } from "@mui/material";
import { Box, Typography, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useLoginMutation } from "../services/mutations";
import { Input, GradientButton, ImgIcon, WarningDialog } from "../components";
import { userIcon } from "../assets/icons";
import { logoDark, loginIllustration } from "../assets/images";
import { transformError } from "../utils";

const passwordValidationRules =
  process.env.NODE_ENV === "production"
    ? Yup.string()
        .min(6)
        .matches(
          /(?=.*[A-Z])/,
          "Password should contain at least one Upper Case letter",
        )
        .matches(
          /(?=.*[a-z])/,
          "Password should contain at least one lower case letter",
        )
        .matches(/(?=.*[0-9])/, "Password should contain at least one digit")
        .label("Password")
    : Yup.string().required().label("Password");

const validationSchema = Yup.object()
  .shape({
    email: Yup.string().required().label("Email"),
    password: passwordValidationRules,
  })
  .required();

const Img = styled("img")({});

const Page = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [visiblePass, setVisiblePass] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState([]);

  const from = location.state?.from?.pathname || "/";

  const { mutate: login } = useLoginMutation({
    onSuccess: ({ accessToken, user: { name: userName } }) => {
      localStorage.setItem("userName", userName);
      localStorage.setItem("accessToken", accessToken);
      navigate(from, { replace: true });
    },
    onError: (error) => {
      setShowError(true);
      setError(error);
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const togglePassVisibility = () =>
    setVisiblePass((visibility) => !visibility);

  const onSubmit = (data) => {
    login(data);
    // console.log("data", data);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ width: "50%", alignSelf: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
            width: "500px",
            margin: "auto",
            mt: -2,
          }}
        >
          <Img
            sx={{ width: "210px", mb: 5 }}
            src={logoDark}
            alt="Rising Stars Logo"
          />
          <Box>
            <Typography
              component="h1"
              sx={{ fontSize: "28px", fontWeight: "bold" }}
            >
              Login
            </Typography>
            <Typography>System Admin</Typography>
          </Box>
          <Input
            control={control}
            name="email"
            label="Email"
            variant="filled"
            sx={{
              "& .MuiInputBase-root": { height: "72px" },
              "& .MuiInputLabel-root": { lineHeight: "2.5" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{ width: "40px", opacity: "0.2" }}
                >
                  <ImgIcon>{userIcon}</ImgIcon>
                </InputAdornment>
              ),
            }}
          />
          <Input
            control={control}
            name="password"
            label="Password"
            type={visiblePass ? "text" : "password"}
            variant="filled"
            sx={{
              "& .MuiInputBase-root": { height: "72px" },
              "& .MuiInputLabel-root": { lineHeight: "2.5" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment onClick={togglePassVisibility} position="end">
                  <IconButton sx={{ color: "#00000033" }}>
                    {visiblePass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <GradientButton
            size="large"
            sx={{ alignSelf: "flex-start" }}
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </GradientButton>
          <Box sx={{ height: 0 }}>
            {Object.values(formErrors)
              .reverse()
              .map(({ message }, index) => (
                <Typography
                  key={index}
                  // sx={{ color: "error.main", ml: "0 !important" }}
                  color="error"
                >
                  {message}
                </Typography>
              ))}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "50%",
          overflow: "hidden",
          bgcolor: "#000",
        }}
      >
        <Img
          sx={{ height: "100%" }}
          src={loginIllustration}
          alt="Rising Stars Login Illustration"
        />
      </Box>
      <WarningDialog
        open={showError}
        title="Error"
        onAccept={() => setShowError(false)}
        description={transformError(error)}
        acceptButtonTitle="OK"
      />
    </Box>
  );
};

export default Page;
