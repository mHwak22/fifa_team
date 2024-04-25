import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import football from "@/public/football.json";
import Image from "next/image";
import icon from "@/public/fifaIcon.svg";

const Loading: any = () => {
  return (
    <div className="flex justify-center items-center h-[600px] md:h-screen bg-gray-200">
      <div className="absolute top-0 left-0 m-2">
        <Image
          src={icon} // Replace with your SVG icon
          alt="Football icon"
          width={80}
          height={50}
        />
      </div>

      <Player
        autoplay
        loop
        src={football}
        style={{ height: "300px", width: "300px" }}
      ></Player>
    </div>
  );
};

export default Loading;
