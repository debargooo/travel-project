import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage or cookies on mount
  useEffect(() => {
    const userData = localStorage.getItem("user") || Cookies.get("user");
    if (userData) {
      try {
        setUser(JSON.parse(decodeURIComponent(userData)));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    setLoading(false);
  }, []);

  // Function to login and set user data
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", encodeURIComponent(JSON.stringify(userData)));
    Cookies.set("user", encodeURIComponent(JSON.stringify(userData)), { expires: 7 });
  };

  // Logout function - remove user from storage
  const logout = () => {
    Cookies.remove("user");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("User Sucessfully Logged Out")
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
