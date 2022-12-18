import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@components/Layout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const postLoginDetails = () => {
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error_message) {
          alert(data.error_message);
        } else {
          //👇🏻 Logs the username to the console
          console.log(data.data);
          //👇🏻 save the username to the local storage
          localStorage.setItem("username", data.data.username);
          //👇🏻 Navigates to the 2FA route
          router.push("/phone-verify");
        }
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //👇🏻 Calls the function
    postLoginDetails();
    setPassword("");
    setEmail("");
  };

  const gotoSignUpPage = () => router.push("/register");

  return (
    <Layout
      authTitle="Hello Friend !"
      authNote="Enter your personal details and start journey with us"
      formTitle="Welcome"
      formNote="Login to the website"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="email" className="auth-text">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
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
        <button className="auth-button">SIGN IN</button>
        <p className="auth-text">
          Don't have an account?{" "}
          <span className="link" onClick={gotoSignUpPage}>
            Sign up
          </span>
        </p>
      </form>
    </Layout>
  );
}
