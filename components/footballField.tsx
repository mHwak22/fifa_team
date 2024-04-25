import React, { Suspense, useEffect, useState } from "react";
import field from "@/public/field.png";
import { useDispatch, useSelector } from "react-redux";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";

import {
  useEventListener,
  useMutation,
  useOthers,
  useStorage,
} from "@/liveblocks.config";

import { initFormation } from "@/positions/formations";
import PlayerCard from "./player/playerCard";
import Bench from "./bench";
import LiveCards from "./player/liveCards";
import { Rate, Spin } from "antd";

import { LoadingOutlined } from "@ant-design/icons";
import { savePlayer } from "@/redux/slices/room-slices";

interface Player {
  name: string;
  position: { x: number; y: number };
  role: string;
  // You can add more properties as needed
}

interface Formation {
  name: string;
  players: Player[];
}

const FootballField: React.FC<{ formation: Formation[] }> = ({ formation }) => {
  const { user } = useUser();

  const [positionName, setPositionName] = useState<String>();
  const [formationState, setFormationState] = useState<Player[]>();
  const [selectedIndex, setSlelectedIndex] = useState<number>();
  const [preIndex, setPreIndex] = useState<number>(-1);
  const [positionData, setPositionData] = useState<any>();
  const [swapFlag, setSwapFlag] = useState<boolean>(false);
  const [livePlayerIndex, setLivePlayerIndex] = useState<number>();
  const [rating, setRating] = useState<number>(0);
  const [starRating, setStarRating] = useState<number>(0);

  const benchPlayerList = useStorage((root) => root.players);
  const fieldPlayerList = useStorage((root) => root.fieldPlayers);
  const indexArray = useStorage((root) => root.formationIndexes);
  const dispatch = useDispatch();

  // console.log("positionData", positionData?.positionData);

  // console.log(allFormations);
  const selectedFormation = useSelector(
    (state: any) => state.formation.formationState
  );

  const benchPlayer = useSelector((state: any) => state.player.playerSelect);

  useEventListener((eventData) => {
    if (eventData.event) {
      // Handle the "EMOJI" event
      // console.log("Received EMOJI event:", eventData);
      setPositionName(eventData.event.formationNameValue);

      // Update state or perform any necessary actions based on the event
    }
  });

  function findFormation(name: any) {
    const formationName = formation.find((form) => form.name === name);
    setFormationState(
      formationName ? formationName.players : [...initFormation.players]
    );
  }

  useEffect(() => {
    function teamRating() {
      if (fieldPlayerList.length == 0) {
        return setRating(0);
      }

      let maxSum = 0;
      for (let i = 0; i < fieldPlayerList.length; i++) {
        maxSum += fieldPlayerList[i].overallRating;
      }
      let avg = maxSum / 11;

      // Map the average score to a star rating from 0 to 5
      var starRating = Math.round(avg / 20); // Assuming each star represents 20 units

      // Ensure the star rating is within the range of 0 to 5
      starRating = Math.max(0, Math.min(starRating, 5));

      setStarRating(starRating);
      setRating(Math.round(avg));

      console.log("avg", Math.round(starRating));
    }
    teamRating();
  }, [fieldPlayerList]);

  //When useffect run whenever current user changes formation
  useEffect(() => {
    findFormation(selectedFormation);
  }, [selectedFormation]);

  useEffect(() => {
    findFormation(positionName);
  }, [positionName]);

  async function handleHydrateList() {
    try {
      // console.log("REached");
      if (benchPlayer.playerState !== 0 && benchPlayer.playerIndex !== null) {
        let playerData = benchPlayerList[benchPlayer.playerIndex];

        let positionData = formation.map((item) => {
          return {
            name: item.name,
            coordinates: item.players[selectedIndex!],
          };
        });

        const newPlayer = {
          ...playerData,
          positionData,
        };
        const updatedFormationState = formationState ? [...formationState] : [];

        setFormationState(updatedFormationState);
        await addPlayerToField(newPlayer);
        await deleteFromBench(benchPlayer.playerIndex);
        await addtoIndexArray(selectedIndex);
        // console.log(formationState);
      }
      dispatch(savePlayer({ playerState: 0, playerIndex: null }));

      return;
    } catch (error) {
      console.log(error);
    }
  }

  const deleteFromBench = useMutation(({ storage }, index) => {
    storage.get("players").delete(index);
  }, []);

  const addPlayerToField = useMutation(({ storage }, newPlayer) => {
    storage.get("fieldPlayers").push(newPlayer);
  }, []);

  const addtoIndexArray = useMutation(({ storage }, index) => {
    storage.get("formationIndexes").push(index);
  }, []);

  ///Swapping functions
  const getCurrPosition = (playerData: any) => {
    // console.log(
    //   "positionData: ",
    //   positionData?.positionData,
    //   "Name : ",
    //   positionData?.firstName
    // );

    const newPlayer = {
      ...playerData,
      positionData: positionData?.positionData,
    };
    setPositionData(null);
    return newPlayer;
  };

  const getPrePosition = (data: any, currData: any) => {
    const newPlayer = {
      ...data,
      positionData: currData?.positionData,
    };
    setPositionData(null);
    return newPlayer;
  };

  /**
   * Swaps the positions of two players in the formation.
   * @param index - The index of the player to be swapped.
   */
  const swapPlayers = useMutation(
    async ({ storage }, index) => {
      //to show swap and cancel text
      setSwapFlag((pre) => !pre);

      // return if the same player is clicked
      if (index === preIndex) {
        setPreIndex(-1);
        return;
      }

      if (preIndex !== -1) {
        // console.log("reached");
        let currData = fieldPlayerList[index];
        let currObj = await getCurrPosition(currData);

        // console.log("Curr Name: ", positionData?.firstName);
        const preData = fieldPlayerList[preIndex];
        const preObj = getPrePosition(preData, currData);

        storage.get("fieldPlayers").set(preIndex, currObj);
        storage.get("fieldPlayers").set(index, preObj);
        setPreIndex(-1); //Reseting state
      } else {
        setPreIndex(index);
        let prePlayer = fieldPlayerList[index];
        setPositionData(prePlayer);
        // console.log(prePlayer?.positionData);
      }
    },
    [preIndex]
  );

  useEffect(() => {
    // console.log(selectedIndex);
    handleHydrateList();
  }, [selectedIndex, livePlayerIndex]);

  return (
    <div className="relative flex justify-start items-center ">
      <Image
        style={{
          opacity: "90%",
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(31,65,61,1) 0%, rgba(6,36,16,1) 100%)",
        }}
        width={950}
        src={field}
        alt="field"
        className="flex dark:bg-current pb-[3px]"
      />

      <div className="absolute top-0 right-0 flex flex-col p-2 text-white">
        <p>Team rating: {rating}</p>
        <Rate allowHalf disabled defaultValue={0} value={starRating} />
      </div>

      {formationState?.map((player, index) => (
        <Suspense
          key={index}
          fallback={
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          }
        >
          <React.Fragment key={index}>
            {!indexArray.includes(index) && (
              <PlayerCard
                key={index}
                player={player}
                uid={user?.id!}
                index={index}
                setSlelectedIndex={setSlelectedIndex}
              />
            )}
          </React.Fragment>
        </Suspense>
      ))}

      {fieldPlayerList?.map((player, index) => (
        <Suspense
          key={index}
          fallback={
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          }
        >
          <LiveCards
            key={player.id}
            player={player}
            index={index}
            swapPlayers={swapPlayers}
            swapFlag={swapFlag}
            preIndex={preIndex}
            setLivePlayerIndex={setLivePlayerIndex}
          />
        </Suspense>
      ))}
      <div className="absolute bottom-0">
        <Bench />
      </div>
    </div>
  );
};

export default FootballField;
