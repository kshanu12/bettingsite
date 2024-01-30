import { useEffect } from "react";
import { useRouter } from "next/router";
import { useToken } from "./tokenContext";

const useAuth = () => {
  const { token, tokenExpiry, isAdmin } = useToken();
  const router = useRouter();

  useEffect(() => {
    if (!(token && tokenExpiry && tokenExpiry > new Date().getTime())) {
      console.log("not-authenticated");
      router.push("/");
    }
  }, [token, tokenExpiry, router]);

  return { isAuthenticated: !!token };
};

export default useAuth;
