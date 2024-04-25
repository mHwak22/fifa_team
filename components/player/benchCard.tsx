import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import AttributeCard from "./attributeCard";
import { savePlayer } from "@/redux/slices/room-slices";
import { useDispatch } from "react-redux";

const BenchCard = ({ player, index }: any) => {
  const [flipped, setFlipped] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    function handleFlipped(event: KeyboardEvent) {
      if ((event.key === "e" || event.key === "E") && isHovered) {
        setFlipped((prev) => !prev);
      }
    }

    // function handleClickOutside(event: MouseEvent) {
    //   if (divRef.current && !divRef.current.contains(event.target as Node)) {
    //     // Clicked outside the div, reset player.id here
    //     resetPlayerId();
    //   }
    // }

    window.addEventListener("keydown", handleFlipped);
    // document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleFlipped);
      // document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isHovered]);

  return (
    <div
      ref={divRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
      // onMouseEnter={() => updateMyPresence({ playerSelectedId: uid })}
    >
      {/* <p>{player.name}</p> */}
      {/* ///Front player card info//// */}
      {!flipped && (
        <div
          className="default_card glow_card w-[84px] h-[100px] flex flex-col justify-center items-center rounded-md"
          onClick={() => {
            // console.log("selectIndex");
            dispatch(
              savePlayer({ playerState: player.id, playerIndex: index })
            );
          }}
        >
          {/* //Position/// */}
          <div className="absolute top-0 left-0 text-[9px] p-1 font-bold text-gray-800">
            <p className="text-xs font-bold">{player.overallRating}</p>
            <p>{player.position.shortLabel}</p>
          </div>

          <div className="rounded-full text-center">
            <div>
              <img
                className="filter-none"
                src={player.avatarUrl}
                alt="img"
                width={60}
                height={60}
              />
            </div>
          </div>

          <div className="flex-col items-center justify-center pt-1 text-black font-semibold text-[10px] text-center">
            {player.commonName ? (
              <p>{player.commonName}</p>
            ) : (
              <p>{player.lastName}</p>
            )}
            <div className="flex justify-center items-center gap-2">
              <img
                className="w-5"
                src={player.nationality.imageUrl}
                alt="falg"
              />

              <img className="w-4 h-4" src={player.team.imageUrl} alt="falg" />
            </div>
          </div>
        </div>
      )}

      {/* flipped player card info */}
      {flipped && <AttributeCard player={player.stats} playerId={player.id} />}
    </div>
  );
};

export default BenchCard;
