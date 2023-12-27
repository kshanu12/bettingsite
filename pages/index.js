import Cards from "@/components/card/cards";
import Navbar from "@/components/navbar/navbar";
import { useEffect, useState } from "react";

export default function Home() {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setTimer(60 - date.getSeconds());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#1f2a37]">
      <Navbar timer={timer} setTimer={setTimer} />
      <Cards timer={timer} setTimer={setTimer} />
    </div>
  );
}
