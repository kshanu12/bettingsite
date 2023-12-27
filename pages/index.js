import Cards from "@/components/card/cards";
import Navbar from "@/components/navbar/navbar";
import { useState } from "react";

export default function Home() {
  const [timer, setTimer] = useState(30);

  return (
    <div className="min-h-screen bg-[#1f2a37]">
      <Navbar timer={timer} setTimer={setTimer} />
      <Cards timer={timer} setTimer={setTimer} />
    </div>
  );
}
