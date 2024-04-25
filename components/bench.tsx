import React, { useEffect, useState } from "react";
import { Button, Drawer, Radio, Space } from "antd";
import {
  ArrowBigUpDashIcon,
  Repeat2Icon,
  Trash,
  TrashIcon,
} from "lucide-react";
import PlayerCard from "./player/playerCard";
import BenchCard from "./player/benchCard";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useStorage } from "@/liveblocks.config";
import { savePlayer } from "@/redux/slices/room-slices";

const Bench: React.FC = () => {
  const [open, setOpen] = useState(false);
  const SelectedPlayer = useSelector((state: any) => state.player.playerSelect);
  const players = useStorage((root) => root.players);
  const dispatch = useDispatch();
  // const [updatedPlayers, setUpdatedPlayers] = useState(players);
  // console.log(players);

  const deleteTodo = useMutation(({ storage }, index) => {
    try {
      if (index === null) {
        return;
      }
      storage.get("players").delete(index);
      dispatch(savePlayer({ playerState: 0, playerIndex: null }));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <Button
          icon={<ArrowBigUpDashIcon color="white" size={25} />}
          type="text"
          onClick={showDrawer}
        ></Button>
        <span
          onClick={showDrawer}
          className="text-sm text-white cursor-pointer"
        >
          open bench
        </span>
      </div>

      <Drawer
        style={{
          backgroundImage: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
        }}
        height={300}
        title="Substitution Bench"
        placement="bottom"
        closable={false}
        onClose={onClose}
        open={open}
      >
        <div className="flex justify-start gap-3">
          {players?.map((item, index) => {
            return (
              <div key={item.id}>
                <BenchCard player={item} index={index} />
              </div>
            );
          })}
        </div>
        <div className="absolute top-0 flex items-center gap-3 ml-[12rem] mt-[1.1rem]">
          <TrashIcon
            className="cursor-pointer"
            size={16}
            color="red"
            onClick={() => deleteTodo(SelectedPlayer.playerIndex)}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default Bench;
