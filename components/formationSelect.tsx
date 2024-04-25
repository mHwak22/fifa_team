import React from "react";

import { useBroadcastEvent, useUpdateMyPresence } from "@/liveblocks.config";

import { formations } from "@/positions/formations";
import { saveFormation } from "@/redux/slices/room-slices";

import { Select } from "antd";
import { Option } from "antd/es/mentions";
import { useDispatch, useSelector } from "react-redux";

import { UserRoundCog } from "lucide-react";
import styles from "./index.module.css";
import LiveSelect from "./liveSelect";

const FormationSelect = () => {
  const dispatch = useDispatch();
  const updateMyPresence = useUpdateMyPresence();
  const broadcast = useBroadcastEvent();

  const formationState = useSelector(
    (state: any) => state.formation.formationState
  );

  const options = formations.map((formation: any, index: any) => (
    <Select.Option key={index} value={formation.name}>
      {formation.name}
    </Select.Option>
  ));

  async function handleFormationChange(event: any) {
    // console.log(`selected ${event}`);
    await updateMyPresence({ formationName: event });

    broadcast({
      formationNameValue: event,
    });

    dispatch(saveFormation(event));
    console.log("formationState", formationState);
  }

  return (
    <>
      <div>
        <div className="flex items-center gap-3">
          <UserRoundCog color="black" />
          <Select
            id="fc-select-1"
            onFocus={(e) =>
              updateMyPresence({ formationSelectedId: e.target.id })
            }
            onBlur={(e) => updateMyPresence({ formationSelectedId: null })}
            onChange={handleFormationChange}
            defaultValue={formations[0].name}
            style={{ width: 220 }}
          >
            {options}
          </Select>
        </div>
      </div>
      <LiveSelect id="fc-select-1" />
    </>
  );
};

export default FormationSelect;
