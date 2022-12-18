import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Dashboard = () => {
  const navigate = useRouter();

  useEffect(() => {
    const checkUser = () => {
      if (!localStorage.getItem("username")) {
        navigate("/");
      }
    };
    checkUser();
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="dashboard">
      <h2 style={{ marginBottom: "30px" }}>Welcome to Dashboard</h2>
      <button className="signOutBtn" onClick={handleSignOut}>
        SIGN OUT
      </button>
    </div>
  );
};

export default Dashboard;
