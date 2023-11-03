import { useEffect, useState } from "react";
import { IMiner, MinerStatus, MinerStatusMap } from "../../types/miner";
import queryString from "query-string";

export default function PlanetMiners(props: { planetId: string }) {
  const [list, setList] = useState<IMiner[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const url = queryString.stringifyUrl({
          url: `${process.env.REACT_APP_API_URL}/miners`,
          query: {
            planetId: props.planetId,
          },
        });
        const res = await fetch(url);
        if (res.ok) {
          const listData = await res.json();
          setList(listData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="scrollable">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Carry capacity</th>
            <th>Travel speed</th>
            <th>Mining speed</th>
            <th>Position (x, y)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>
                {item.minerals}/{item.carryCapacity}
              </td>
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
    </div>
  );
}
