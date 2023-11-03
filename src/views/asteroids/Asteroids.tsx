import { useState, useEffect } from "react";
import { IAsteroid } from "../../types/asteroid";
import { IRefreshData } from "../../types/refreshData";
import socket from "../../utils/socket";

export default function Asteroids() {
  const [list, setList] = useState<IAsteroid[]>([]);

  useEffect(() => {
    function onRefreshData(data: IRefreshData) {
      const curr: IAsteroid[] = data.asteroids.map((item) => {
        return {
          ...item,
          currentMiner: item.currentMiner ? item.currentMiner.name : ''
        }
      })
      setList(
        curr
      );
    }

    socket.on("tick", onRefreshData);

    return () => {
      socket.off("tick");
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/asteroids`);
        if (res.ok) {
          const listData = (await res.json()) as IAsteroid[];
          setList(listData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Minerals</th>
            <th>Current miner</th>
            <th>Position (x, y)</th>
          </tr>
        </thead>

        <tbody>
          {list.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td className={item.minerals === 0 ? "alert" : ""}>
                {item.minerals}
              </td>
              <td>{item.currentMiner || "-"}</td>
              <td>
                {item.position.x}, {item.position.y}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
