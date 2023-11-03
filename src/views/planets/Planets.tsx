import { MouseEventHandler } from "react";
import { useState, useEffect } from "react";
import Rodal from "rodal";
import PlanetMiners from "./PlanetMiners";
import CreateMinerForm from "./CreateMinerForm";
import { IPlanet } from "../../types/planet";
import "./planets.scss";
import socket from "../../utils/socket";
import { IRefreshData } from "../../types/refreshData";


const PlanetList = () => {
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [currentPlanetName, setCurrentPlanetName] = useState<
    string | undefined
  >();
  const [currentPlanetId, setCurrentPlanetId] = useState<string | undefined>();
  const [popupVisible, setPopupVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [list, setList] = useState<IPlanet[]>([]);
  
  useEffect(() => {
    function onRefreshData(data: IRefreshData) {
      setList(data.planets)
    }
  
    socket.on('tick', onRefreshData);
  
    return () => {
      socket.off('tick');
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/planets`);
        if (res.ok) {
          const listData = (await res.json()) as IPlanet[];
          setList(listData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  // useEffect(() => {
    // if (!lastJsonMessage || lastJsonMessage.message !== "planetUpdate") {
    //   return;
    // }
    // const planet = lastJsonMessage.planet;
    // if (!planet) {
    //   return;
    // }
    // const newList = list.map((item) => {
    //   if (item.id === planet.id) {
    //     item = planet;
    //   }
    //   return item;
    // });
    // setList([...newList]);
  // }, [readyState, lastJsonMessage]);

  const showPopup = (id: string, name: string) => {
    setCurrentPlanetId(id);
    setCurrentPlanetName(name);
    setPopupVisible(true);
  };

  const hidePopup = () => {
    setPopupVisible(false);
  };

  const showForm: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    setFormVisible(true);
  };

  const hideForm = () => {
    setFormVisible(false);
  };

  return (
    <div className="plants">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Miners</th>
            <th>Minerals</th>
            <th>Position (x, y)</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {list.map((item) => (
            <tr
              key={item.name}
              onClick={() => {
                showPopup(item._id, item.name);
              }}
            >
              <td>{item.name}</td>
              <td>{item.miners}</td>
              <td className={item.minerals >= 1000 ? "active" : ""}>
                {item.minerals}/1000
              </td>
              <td>
                {item.position.x}, {item.position.y}
              </td>
              <td>
                {item.minerals >= 1000 && (
                  <div className="icon-addminer" onClick={showForm}>
                    Create a miner
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Rodal
        visible={popupVisible}
        onClose={hidePopup}
        width={550}
        height={480}
      >
        <h2>List of miners of {currentPlanetName}</h2>
        {currentPlanetId && <PlanetMiners planetId={currentPlanetId} />}
      </Rodal>

      <Rodal visible={formVisible} onClose={hideForm} width={440} height={420}>
        <h2>Create a miner</h2>
        <CreateMinerForm
          planets={list}
          onSuccess={() => {
            hideForm();
            setIsSuccessVisible(true);
          }}
        />
      </Rodal>
      <Rodal
        showCloseButton
        visible={isSuccessVisible}
        width={447}
        height={136}
        onClose={() => {
          setIsSuccessVisible(false);
        }}
      >
        <h2 className="success-title">The miner was successfully created</h2>
      </Rodal>
    </div>
  );
};

export default PlanetList;
