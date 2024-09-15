import { createContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  return (
    <AuthContext.Provider value={{ isAuthenticated, setisAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
