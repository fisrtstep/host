import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

function readStoredAuth() {
  try {
    const raw = localStorage.getItem('token');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(readStoredAuth);

  const login = (userAuth) => {
    localStorage.setItem('token', JSON.stringify(userAuth));
    setAuth(userAuth);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth(null);
  };

  const value = {
    token: auth?.token ?? null,
    username: auth?.username ?? null,
    userId: auth?.userId ?? null,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
