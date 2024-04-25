import React, { useEffect, useState } from "react";
import { Modal, Select } from "antd";
import { savePlayer } from "@/redux/slices/room-slices";
import { useDispatch, useSelector } from "react-redux";

import { LiveObject } from "@liveblocks/client";
import axios from "axios";
import { useMutation, useStorage } from "@/liveblocks.config";
import { todo } from "node:test";

/**
 * A component for displaying a modal dialog with a searchable select list of players.
 *
 * @param modalOpen - Whether the modal is currently open
 * @param setModalOpen - A function to set whether the modal is open
 * @param playersData - An array of player objects with at least an `id` and `firstName` and `lastName` properties
 */
const SearchModal: React.FC<{
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  playersData: { id: number; firstName: string; lastName: string }[];
}> = ({ modalOpen, setModalOpen, playersData }) => {
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");
  const playerid = useSelector((state: any) => state.player.playerState);
  const dispatch = useDispatch();

  /**
   * A function to handle a change in the selected player value in the select list.
   *
   * @param value - The value of the selected player
   */
  const handleSelectChange = (value: string) => {
    console.log("Selected player: " + value);
    setSelectedPlayer(value);
  };

  const handleConfirm = () => {
    // setCookie("playerId", selectedPlayer);
    setModalOpen(false);
    // dispatch(savePlayer(selectedPlayer));
    console.log("Player ID updated:", playerid);
    getSelectedPlayerData(selectedPlayer);
  };

  //Getting player by id from api
  const getSelectedPlayerData = async (id: string) => {
    const pid = Number(id);
    const response = await axios.get(`/api/getPlayerbyId?pid=${pid}`);
    // console.log(response.data);
    // addPlayerToBench(response.data);
    await updatePlayer(response.data[0]);
  };

  // useEffect(() => {
  //   console.log(players);
  // }, [players]);

  const updatePlayer = useMutation(({ storage }, data) => {
    storage.get("players").push(new LiveObject(data));
  }, []);

  // const addPlayerToBench = (player: any) => {
  //   for (const key in player) {
  //     object.set("Kevin", player[key]);
  //   }
  //   console.log("object", object.get("Kevin"));
  // };

  /**
   * An array of options for the select list, containing player objects with `value` and `label` properties.
   */
  const playerOptions = playersData?.map((player: any) => ({
    value: player.id.toString(),
    label: (
      <div className="flex items-center">
        <img
          src={player?.avatarUrl}
          alt="Player Image"
          style={{ width: "24px", height: "24px", marginRight: "8px" }}
        />
        <span>{`${player.firstName} ${player.lastName}`}</span>

        <div className="absolute right-0 pr-4">
          <span className="font-semibold">{`${player?.position.shortLabel}`}</span>
        </div>
      </div>
    ),
  }));

  /**
   * A function to get the text content of a label, handling JSX elements.
   *
   * @param label - The label to get the text content of
   * @returns The text content of the label
   */
  const getLabelString = (label: React.ReactNode): string => {
    if (typeof label === "string") {
      return label.toLowerCase();
    } else if (React.isValidElement(label)) {
      // Handle JSX element
      let textContent = "";
      React.Children.forEach(label.props.children, (child) => {
        if (typeof child === "string") {
          textContent += child;
        } else if (React.isValidElement(child)) {
          textContent += getLabelString(child);
        }
      });
      return textContent.toLowerCase();
    } else {
      return "";
    }
  };

  /**
   * A function to filter options in the select list based on a search query.
   *
   * @param input - The search query
   * @param option - The option to filter
   * @returns Whether the option matches the search query
   */
  const filterOption = (input: string, option: any) => {
    const label = option?.label ?? "";
    const labelString = getLabelString(label);
    return labelString.includes(input.toLowerCase());
  };

  return (
    <div>
      <Modal
        title="Search Player"
        centered
        visible={modalOpen}
        onOk={handleConfirm}
        okType="default"
        onCancel={() => setModalOpen(false)}
      >
        <Select
          className="w-full"
          showSearch
          placeholder="Search to Select"
          optionFilterProp="children"
          filterOption={filterOption}
          value={selectedPlayer}
          onChange={handleSelectChange}
          options={playerOptions}
          virtual={false}
        />
      </Modal>
    </div>
  );
};

export default SearchModal;
