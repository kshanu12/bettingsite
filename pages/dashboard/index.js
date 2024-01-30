import Cards from "@/components/card/cards";
import Navbar from "@/components/navbar/navbar";
import { useEffect, useState } from "react";
// import useAuth from "@/hooks/userAuth";

export default function Home() {
  const [ timer, setTimer ] = useState(0);
  // const { isAuthenticated } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setTimer(60 - date.getSeconds());
    }, 1000);

    return () => clearInterval(interval);
  }, [setTimer]);

  // return isAuthenticated ? (
  return (
    <div className="min-h-screen bg-[#1f2a37]">
      <Navbar timer={timer} setTimer={setTimer} />
      <Cards timer={timer} setTimer={setTimer} />
    </div>
  );
  // ) : null;
}
