import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { UserSearch } from "lucide-react";
import SearchModal from "./searchModal";

import axios from "axios";

const SearchPlayer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [playersData, setPlayersData] = useState<any>();

  function handleClick(event: any) {
    // console.log(event.target.id);
    setModalOpen(true);
  }

  useEffect(() => {
    async function getPlayers() {
      try {
        const response = await axios.get("/api/players");
        // console.log(response.data);
        setPlayersData(response.data);
      } catch (error) {
        console.log("error", error);
      }
    }

    getPlayers();
  }, []);

  return (
    <>
      <div className="mt-24 flex gap-3 items-center">
        <UserSearch />
        <p
          // id="sp-1"
          className="border p-1 pl-2 cursor-pointer rounded-md text-sm"
          style={{ width: 220 }}
          onClick={(e) => handleClick(e)}
        >
          Search
        </p>
      </div>

      <SearchModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        playersData={playersData}
      />
    </>
  );
};

export default SearchPlayer;
