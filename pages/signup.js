import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@components/Layout";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const postSignUpDetails = () => {
    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        tel,
        username,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        router.push("/login");
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //👇🏻 Call it within the submit function
    postSignUpDetails();
    setEmail("");
    setTel("");
    setUsername("");
    setPassword("");
  };
  const gotoLoginPage = () => router.push("/");

  return (
    <Layout
      authTitle="Welcome Back !"
      authNote="To keep connected with us please login with your personal info"
      formTitle="Create Account"
      formNote="By signing up, you agree to our terms & policy"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="email" className="auth-text">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="username" className="auth-text">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="tel" className="auth-text">
          Phone Number
        </label>
        <input
          type="tel"
          name="tel"
          id="tel"
          value={tel}
          required
          onChange={(e) => setTel(e.target.value)}
        />
        <label htmlFor="password" className="auth-text">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          minLength={8}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="auth-button">SIGN UP</button>
        <p className="auth-text">
          Already have an account?{" "}
          <span className="link" onClick={gotoLoginPage}>
            Login
          </span>
        </p>
      </form>
    </Layout>
  );
};

export default Signup;
