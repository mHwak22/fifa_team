import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import AttributeCard from "./attributeCard";
import { savePlayer } from "@/redux/slices/room-slices";
import { useDispatch, useSelector } from "react-redux";
import { Popover } from "antd";
import { Delete, Repeat2, UserRoundCog } from "lucide-react";
import { useMutation, useStorage } from "@/liveblocks.config";
import { formations, initFormation } from "@/positions/formations";
import axios from "axios";

const LiveCards = ({
  player,
  index,
  swapPlayers,
  swapFlag,
  preIndex,
  setLivePlayerIndex,
}: any) => {
  const [flipped, setFlipped] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState(false);
  const [playerCoordinates, setPlayerCoordinates] = useState<any>();
  const [open, setOpen] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const fieldPlayers = useStorage((root) => root.fieldPlayers);

  const selectedFormation = useSelector(
    (state: any) => state.formation.formationState
  );

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  useEffect(() => {
    function handleFlipped(event: KeyboardEvent) {
      if ((event.key === "e" || event.key === "E") && isHovered) {
        setFlipped((prev) => !prev);
      }
    }

    window.addEventListener("keydown", handleFlipped);

    return () => {
      window.removeEventListener("keydown", handleFlipped);
    };
  }, [isHovered]);

  useEffect(() => {
    const formationName = player.positionData.find(
      (form: any) => form.name === selectedFormation
    );
    setPlayerCoordinates(formationName.coordinates.position);
    // console.log(formationName.coordinates.position);
  }, [selectedFormation]);

  async function getPlayerbyId(pid: number) {
    const response = await axios.get(`/api/getPlayerbyId?pid=${pid}`);
    return response.data;
  }

  const benchPlayer = useMutation(async ({ storage }, index) => {
    const newPlayer = await getPlayerbyId(player.id);
    storage.get("players").push(newPlayer[0]);
    storage.get("formationIndexes").delete(index);
    storage.get("fieldPlayers").delete(index);
  }, []);

  const deletePlayer = useMutation(({ storage }, index) => {
    storage.get("fieldPlayers").delete(index);
    storage.get("formationIndexes").delete(index);
  }, []);

  const content = () => {
    return (
      <div className="flex flex-col justify-center text-xs  font-semibold">
        <li
          onClick={() => {
            // setLivePlayerIndex(index);
            swapPlayers(index);
          }}
          className="hover:bg-slate-200 rounded-md p-1 cursor-pointer flex gap-1"
        >
          <Repeat2 size={14} />
          {preIndex === index && swapFlag ? (
            <span onClick={() => setLivePlayerIndex(-1)}>Cancel</span>
          ) : (
            <span>Swap</span>
          )}
        </li>
        <li
          onClick={() => benchPlayer(index)}
          className="hover:bg-slate-200 rounded-md p-1 cursor-pointer flex gap-1"
        >
          <UserRoundCog size={14} />
          Bench
        </li>
        <li
          onClick={() => deletePlayer(index)}
          className="hover:bg-slate-200 rounded-md p-1 cursor-pointer flex gap-1"
        >
          <Delete size={14} />
          Delete
        </li>
      </div>
    );
  };

  return (
    <Popover
      overlayStyle={{ width: "100px", height: "50px" }}
      content={content}
      trigger="hover"
      open={open}
      onOpenChange={handleOpenChange}
      placement="right"
    >
      <div
        ref={divRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex"
        style={{
          position: "absolute",
          left: playerCoordinates?.x,
          top: playerCoordinates?.y,
          marginLeft: "21rem",
          marginTop: "0.5rem",
        }}
      >
        {/* <p>{index}</p> */}
        {/* ///Front player card info//// */}
        {!flipped && (
          <div className="default_card glow_card w-[84px] h-[100px] flex flex-col justify-center items-center rounded-md">
            {/* //Position/// */}
            <div
              className="absolute top-0 left-0 text-[9px] p-1 font-bold text-gray-800"
              // onClick={() => setSlelectedIndex(index)}
            >
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

                <img
                  className="w-4 h-4"
                  src={player.team.imageUrl}
                  alt="falg"
                />
              </div>
            </div>
          </div>
        )}

        {/* flipped player card info */}
        {flipped && (
          <AttributeCard player={player.stats} playerId={player.id} />
        )}
      </div>
    </Popover>
  );
};

export default LiveCards;
