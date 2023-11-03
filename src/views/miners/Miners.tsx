import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { IMiner, MinerStatus, MinerStatusMap } from "../../types/miner";
import Rodal from "rodal";
import "./miners.scss";
import MinerHistory from "./MinerHistory";

export default function Miners() {
  const [currentName, setCurrentName] = useState<string | undefined>(undefined);
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);
  const [list, setList] = useState<IMiner[]>([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const { lastJsonMessage, readyState } = useWebSocket(
    `${process.env.REACT_APP_SOCKET_URL}`
  );

  const openPopup = (id: string, name: string) => {
    setCurrentName(name)
    setCurrentId(id);
    setPopupVisible(true);
  };

  const hidePopup = () => {
    setPopupVisible(false);
  };

  // useEffect(() => {
  //   if (!lastJsonMessage || lastJsonMessage.message !== "minerUpdate") {
  //     return;
  //   }
  //   const miner = lastJsonMessage.miner;
  //   if (!miner) {
  //     return;
  //   }
  //   const newList = list.map((item) => {
  //     if (item.id === miner.id) {
  //       item = miner;
  //     }
  //     return item;
  //   });
  //   setList([...newList]);
  // }, [readyState, lastJsonMessage]);

  useEffect(() => {
    const getMiners = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/miners`);
        if (res.ok) {
          const list = await res.json();
          setList(list);
        }
      } catch {}
    };

    getMiners();
  }, []);

  return (
    <div className="miners">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Planet</th>
            <th>Carry capacity</th>
            <th>Travel speed</th>
            <th>Mining speed</th>
            <th>Position (x, y)</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {list.map((item) => (
            <tr
              key={item.name}
              onClick={() => {
                openPopup(item._id, item.name);
              }}
            >
              <td>{item.name}</td>
              <td>{item.planet}</td>
              <td>{item.carryCapacity}</td>
              <td>{item.travelSpeed}</td>
              <td>{item.miningSpeed}</td>
              <td>
                {Math.floor(item.x)},{Math.floor(item.y)}
              </td>
              <td>{MinerStatusMap[item.status as MinerStatus]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Rodal
        showCloseButton
        visible={popupVisible}
        onClose={hidePopup}
        width={782}
        height={480}
      >
        <h2 className="miners-history-title">History of {currentName}</h2>
        {currentId && <MinerHistory minerId={currentId} />}
      </Rodal>
    </div>
  );
}
