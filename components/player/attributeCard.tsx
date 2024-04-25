import { savePlayer } from "@/redux/slices/room-slices";
import React from "react";
import { useDispatch } from "react-redux";

const AttributeCard = ({ player, playerId }: any) => {
  const dispatch = useDispatch();

  return (
    <div
      className="default_card glow_card w-[84px] h-[100px] flex flex-col justify-center items-center rounded-md"
      onClick={() => dispatch(savePlayer(playerId))}
    >
      <div className="flex flex-col justify-start">
        <div className="flex justify-between text-[9px] font-semibold">
          <p>PAC</p>
          <p>{player.pac.value}</p>
        </div>

        <div className="flex justify-between text-[9px] font-semibold">
          <p>SHO</p>
          <p>{player.sho.value}</p>
        </div>

        <div className="flex justify-between text-[9px] font-semibold">
          <p>PAS</p>
          <p>{player.pas.value}</p>
        </div>

        <div className="flex justify-between text-[9px] font-semibold">
          <p>DEF</p>
          <p>{player.def.value}</p>
        </div>

        <div className="flex gap-8 text-[9px] font-semibold">
          <p>PHY</p>
          <p>{player.phy.value}</p>
        </div>
      </div>
    </div>
  );
};

export default AttributeCard;
