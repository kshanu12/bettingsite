import { createContext, useContext, useState, useEffect } from "react";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [tokenExpiry, setTokenExpiry] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const setTokenInfo = (newToken, newTokenExpiry, newIsAdmin) => {
    setToken(newToken);
    setTokenExpiry(newTokenExpiry);
    setIsAdmin(newIsAdmin);

    localStorage.setItem("token", newToken);
    localStorage.setItem("tokenExpiry", newTokenExpiry.toString());
    localStorage.setItem("isAdmin", newIsAdmin.toString());
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedTokenExpiry = localStorage.getItem("tokenExpiry");
    const storedIsAdmin = localStorage.getItem("isAdmin");

    if (storedToken && storedTokenExpiry && storedIsAdmin) {
      setTokenInfo(
        storedToken,
        Number(storedTokenExpiry),
        storedIsAdmin === "true"
      );
    }
  }, []);

  return (
    <TokenContext.Provider
      value={{ token, tokenExpiry, isAdmin, setTokenInfo }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  return context || { token: null, tokenExpiry: null, isAdmin: false };
};
