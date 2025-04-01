import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import UserHomePage from "./UserHomePage";

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  // Redirects after signing in will lead to this route.
  return isAuthenticated ? <UserHomePage /> : null;
};

export default HomePage;

