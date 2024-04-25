import Image from "next/image";
import "../style.css";
import Draggable from "react-draggable";

interface Player {
  name: string;
  position: { x: number; y: number };
  role: string;
}

const PlayerCard: React.FC<{
  player: Player;
  uid: string;
  index: any;
  setSlelectedIndex: any;
}> = ({ player, uid, index, setSlelectedIndex }) => {
  // const updateMyPresence = useUpdateMyPresence();

  return (
    <Draggable>
      <div
        // onMouseEnter={() => updateMyPresence({ playerSelectedId: uid })}
        style={{
          position: "absolute",
          left: player?.position.x,
          top: player?.position.y,
          marginLeft: "21rem",
          marginTop: "0.5rem",
          display: "flex",
        }}
      >
        {/* {index} */}
        {/* <p>{player.name}</p> */}
        {/* ///Render cards dynamically//// */}
        <div
          className="default_card glow_card w-[84px] h-[100px] flex flex-col justify-center items-center rounded-md"
          onClick={() => setSlelectedIndex(index)}
        >
          {/* //Position/// */}
          <div className="absolute top-0 left-0 text-xs p-1 font-bold text-gray-800">
            <p>{player?.role}</p>
          </div>

          <div className="rounded-full bg-blue-600 text-center">
            <p className="text-1xl font-bold italic p-1 pr-3">UT</p>
          </div>
        </div>
        {/* Additional player card info */}
        {/* <Repeat2 size={16} color="blue" /> */}
      </div>
    </Draggable>
  );
};

export default PlayerCard;
