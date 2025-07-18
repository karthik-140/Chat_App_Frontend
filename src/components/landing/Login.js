import React from "react";
import { useForm } from "react-hook-form";
import { Button, Typography, Link } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import {
  CustomPaper,
  CustomTextField,
  CustomHeading,
} from "../../customComponents";
import { loginSchema } from "../../schemas/userSchema";

const Login = ({ login, error, setShowLogin }) => {
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      const token = response?.data?.token;
      if (!!token) {
        localStorage.setItem("token", token);
        navigate("/chats");
      }
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CustomPaper className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2">
      <CustomHeading
        sx={{ fontWeight: 700 }}
        className="font-extrabold"
        variant="h4"
        align="center"
      >
        Login
      </CustomHeading>
      {error && (
        <Typography className="text-red-500 self-center" variant="h6">
          {error?.data?.message}
        </Typography>
      )}
      <CustomTextField
        name={"email"}
        label={"Email"}
        type={"email"}
        control={control}
        isRequired
      />
      <CustomTextField
        name={"password"}
        label={"Password"}
        type={"password"}
        control={control}
        isRequired
      />
      <Button
        sx={{ textTransform: "capitalize", marginTop: "1rem" }}
        className="self-center uppercase font-bold"
        color="success"
        variant="contained"
        onClick={handleSubmit(onSubmit)}
      >
        submit
      </Button>
      <div className="flex flex-col items-center text-green-600 self-center mt-2">
        {/* <Typography className='flex gap-0.5'>
          Forgot password?
          <Link
            component={'button'}
          // onClick={() => setForgotPassword(true)}
          >
            Click here
          </Link>
        </Typography> */}
        <Typography className="flex gap-0.5">
          New user?{" "}
          <Link component={"button"} onClick={() => setShowLogin(false)}>
            Signup
          </Link>
        </Typography>
      </div>
    </CustomPaper>
  );
};

export default Login;
