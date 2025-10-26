import React, { createContext, useState, useContext } from 'react';

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Create a Provider component
export const AuthProvider = ({ children }) => {
  // Simple state to track if a user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simple client-side login function
  const login = (username, password) => {
    // In a real application, you would make an API call here.
    // For now, we'll use a simple hardcoded check.
    if (username === 'user' && password === 'password') {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const value = {
    isLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Custom hook to use the Auth context easily
export const useAuth = () => {
  return useContext(AuthContext);
};