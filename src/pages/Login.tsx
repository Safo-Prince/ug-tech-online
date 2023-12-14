import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header
        setOpen={() => {
          return;
        }}
      />
      <Hero title="UG Online Technologies Portal" />
      <LoginForm />
      <Footer />
    </div>
  );
};

export default Login;
