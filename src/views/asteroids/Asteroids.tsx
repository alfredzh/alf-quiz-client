import { useState, useEffect } from "react";
// import useWebSocket from "react-use-websocket";

interface IAsteroid {
  currentMiner?: string;
  minerals: number;
  name: string;
  position: { x: number; y: number };
  status: number;
}

export default function Asteroids() {
  const [list, setList] = useState<IAsteroid[]>([]);
  // const { lastJsonMessage, readyState } = useWebSocket(
  //   `${process.env.REACT_APP_SOCKET_URL}`
  // );

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

  // useEffect(() => {
  //   if (!lastJsonMessage || lastJsonMessage.message !== "asteroidUpdate") {
  //     return;
  //   }
  //   const asteroid = lastJsonMessage.asteroid;
  //   if (!asteroid) {
  //     return;
  //   }
  //   const newList = list.map((item) => {
  //     if (item.id === asteroid.id) {
  //       item = asteroid;
  //     }
  //     return item;
  //   });
  //   setList([...newList]);
  // }, [readyState, lastJsonMessage]);

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
            <tr key={item.name}>
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
