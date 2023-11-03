import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import queryString from "query-string";
import { MinerStatus, MinerStatusMap } from "../../types/miner";

interface IMinerHistory {
  capacity: { current: number; max: number };
  createdAt: string;
  miner: string;
  planet: string;
  position: { x: number; y: number };
  speed: { travel: number; mining: number };
  status: number;
  updatedAt: string;
  year: number;
}

export default function MinerHistory(props: { minerId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [historyList, setHistoryList] = useState<IMinerHistory[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const url = queryString.stringifyUrl({
          url: `${process.env.REACT_APP_API_URL}/history`,
          query: {
            minerId: props.minerId,
          },
        });
        const res = await fetch(url);
        if (res.ok) {
          const listData = await res.json();
          setHistoryList(listData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [props.minerId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="miner-history scrollable">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Year</th>
            <th>Planet</th>
            <th>Carry capacity</th>
            <th>Travel speed</th>
            <th>Mining speed</th>
            <th>Position (x, y)</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {historyList.map((item) => (
            <tr key={item.miner}>
              <td>{item.createdAt}</td>
              <td>{item.year}</td>
              <td>{item.planet}</td>
              <td
                className={
                  item.capacity.current === item.capacity.max ? "active" : ""
                }
              >
                {item.capacity.current}/{item.capacity.max}
              </td>
              <td>{item.speed.travel}</td>
              <td>{item.speed.mining}</td>
              <td>
                {item.position.x}, {item.position.y}
              </td>
              <td>{MinerStatusMap[item.status as MinerStatus]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
