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
    // console.log("inside useEffect tokenContext");
    const storedToken = localStorage.getItem("token");
    const storedTokenExpiry = localStorage.getItem("tokenExpiry");
    const storedIsAdmin = localStorage.getItem("isAdmin");
    // console.log(storedToken);

    if (storedToken && storedTokenExpiry && storedIsAdmin) {
      setTokenInfo(
        storedToken,
        Number(storedTokenExpiry),
        storedIsAdmin === "true"
      );
    }
  }, []);

  // useEffect(() => {
  //   if (token && tokenExpiry && tokenExpiry < Date.now()) {
  //     setTokenInfo(null, null, false);
  //   }
  // }, [token, tokenExpiry]);

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

// // tokenContext.js
// import { createContext, useContext, useState, useEffect } from "react";

// const TokenContext = createContext();

// export const TokenProvider = ({ children }) => {
//   const [token, setToken] = useState(null);
//   const [tokenExpiry, setTokenExpiry] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false);

//   const setTokenInfo = (newToken, newTokenExpiry, newIsAdmin) => {
//     setToken(newToken);
//     setTokenExpiry(newTokenExpiry);
//     setIsAdmin(newIsAdmin);

//     // Store token information in local storage
//     localStorage.setItem("token", newToken);
//     localStorage.setItem("tokenExpiry", newTokenExpiry.toString());
//     localStorage.setItem("isAdmin", newIsAdmin.toString());
//   };

//   // Initialize from local storage on mount
//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     const storedTokenExpiry = localStorage.getItem("tokenExpiry");
//     const storedIsAdmin = localStorage.getItem("isAdmin");

//     if (storedToken && storedTokenExpiry && storedIsAdmin) {
//       setTokenInfo(storedToken, Number(storedTokenExpiry), storedIsAdmin === "true");
//     }
//   }, []);

//   // Check token expiration on mount and handle accordingly
//   useEffect(() => {
//     if (token && tokenExpiry && tokenExpiry < Date.now()) {
//       // Token is expired, handle accordingly (e.g., redirect to login)
//       setTokenInfo(null, null, false);
//     }
//   }, [token, tokenExpiry]);

//   return (
//     <TokenContext.Provider
//       value={{ token, tokenExpiry, isAdmin, setTokenInfo }}
//     >
//       {children}
//     </TokenContext.Provider>
//   );
// };

// export const useToken = () => {
//   const context = useContext(TokenContext);

//   // Securely initialize values (e.g., from local storage)
//   const initializedContext = {
//     token: context?.token || null,
//     tokenExpiry: context?.tokenExpiry || null,
//     isAdmin: context?.isAdmin || false,
//   };

//   return initializedContext;
// };
