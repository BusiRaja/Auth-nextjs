import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@components/Layout";

const PhoneVerify = () => {
  const [code, setCode] = useState("");
  const router = useRouter();

  const postVerification = async () => {
    fetch("/api/verify", {
      method: "POST",
      body: JSON.stringify({
        code,
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
          //👇🏻 Navigates to the dashboard page
          router.push("/dashboard");
        }
      })
      .catch((err) => console.error(err));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //👇🏻 Calls the function
    postVerification();
    setCode("");
  };

  return (
    <Layout
      src="/two_factor.gif"
      formTitle="Verify number"
      formNote="A code has been sent your phone"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="code"
          id="code"
          className="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button className="auth-button">AUTHENTICATE</button>
      </form>
    </Layout>
  );
};

export default PhoneVerify;
