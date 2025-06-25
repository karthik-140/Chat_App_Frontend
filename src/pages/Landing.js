import { useState } from "react";

import { useSignupMutation, useLoginMutation } from "../api/userApi";
import Signup from "../components/landing/Signup";
import Login from "../components/landing/Login";
import Header from "../components/header/Header";
import CustomLoading from "../customComponents/CustomLoading";

const Landing = () => {
  const [showLogin, setShowLogin] = useState(false);

  const [signup, { error: signupError, isLoading: signupLoading }] =
    useSignupMutation();
  const [login, { error: loginError, isLoading: loginLoading }] =
    useLoginMutation();

  return (
    <>
      <CustomLoading open={signupLoading || loginLoading} />
      <Header />
      {showLogin ? (
        <Login
          login={login}
          error={loginError}
          isLoading={loginLoading}
          setShowLogin={setShowLogin}
        />
      ) : (
        <Signup
          signup={signup}
          error={signupError}
          isLoading={signupLoading}
          setShowLogin={setShowLogin}
        />
      )}
    </>
  );
};

export default Landing;
