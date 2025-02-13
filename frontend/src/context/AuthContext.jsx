import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");

    console.log("Token in session:", token);
    console.log("User in session:", storedUser);

    if (token && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setIsAuthenticated(true);
      setUser(parsedUser);
      setRole(parsedUser.role);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, role, setRole, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
