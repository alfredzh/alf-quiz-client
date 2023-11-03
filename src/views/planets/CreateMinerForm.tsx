import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { IPlanet } from "../../types/planet";

export default function CreateMinerForm(props: {
  planets: IPlanet[];
  onSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [planetId, setPlanetId] = useState(props.planets[0]?._id);
  const [carryCapacity, setCarryCapacity] = useState(0);
  const [travelSpeed, setTravelSpeed] = useState(0);
  const [miningSpeed, setMiningSpeed] = useState(0);
  const limit = 120;

  const isNameValid = useMemo(() => {
    if (!name) {
      return false;
    }
    return true;
  }, [name]);

  const isCarryCapacityValid = useMemo(() => {
    if (carryCapacity <= 0) {
      return false;
    }
    return true;
  }, [carryCapacity]);

  
  const isTravelSpeedValid = useMemo(() => {
    if (travelSpeed <= 0) {
      return false;
    }
    return true;
  }, [travelSpeed]);

  
  const isMiningSpeedValid = useMemo(() => {
    if (miningSpeed <= 0) {
      return false;
    }
    return true;
  }, [miningSpeed]);

  const totalPoints = useMemo(() => {
    return carryCapacity + travelSpeed + miningSpeed;
  }, [carryCapacity, travelSpeed, miningSpeed]);

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) {
      return;
    }

    if (!isNameValid) {
      return;
    }

    if (carryCapacity === 0) {
      return;
    }

    if (travelSpeed === 0) {
      return;
    }

    if (miningSpeed === 0) {
      return;
    }

    if (totalPoints > limit) {
      return;
    }

    const currentPlanet = props.planets.find((item) => item._id === planetId);
    if (!currentPlanet) {
      return;
    }

    const data = {
      name,
      planet: currentPlanet._id,
      x: currentPlanet.position.x,
      y: currentPlanet.position.y,
      carryCapacity,
      travelSpeed,
      miningSpeed,
      angle: 0,
      status: 0,
      minerals: 0,
      target: currentPlanet._id,
      targetType: "Planet",
    };

    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.REACT_APP_API_URL}/miners`, {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(data),
      });
      console.log(res.ok);
      if (res.ok) {
        props.onSuccess();
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="create-form" onSubmit={onSubmit}>
        <div className={`field ${isNameValid ? "" : "error"}`}>
          <label htmlFor="name">Miner name</label>
          <input
            type="text"
            id="name"
            placeholder="Miner name"
            onChange={onNameChange}
          />
        </div>

        <div className="field">
          <label htmlFor="planet">Planet</label>
          <select
            placeholder="Select a planet"
            id="planet"
            onChange={(e) => {
              setPlanetId(e.target.value);
            }}
          >
            {props.planets.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <h2>Assign points</h2>
        <div className="columns">
          <div className="column">
            <div className={`field ${isCarryCapacityValid ? "" : "error"}`}>
              <label htmlFor="carry-capacity">Carry capacity</label>
              <input
                value={carryCapacity}
                type="number"
                id="carry-capacity"
                placeholder="0"
                onChange={(e) => setCarryCapacity(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="column">
            <div className={`field ${isTravelSpeedValid ? "" : "error"}`}>
              <label htmlFor="travel-speed">Travel speed</label>
              <input
                value={travelSpeed}
                type="number"
                id="travel-speed"
                placeholder="0"
                onChange={(e) => setTravelSpeed(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="column">
            <div className={`field ${isMiningSpeedValid ? "" : "error"}`}>
              <label htmlFor="mining-speed">Mining speed</label>
              <input
                value={miningSpeed}
                type="number"
                id="mining-speed"
                placeholder="0"
                onChange={(e) => setMiningSpeed(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
        <div className={totalPoints <= limit ? "green" : "red"}>
          Total: {totalPoints}/{limit}
        </div>
        <div className="actions">
          <button>Save</button>
        </div>
      </form>
    </>
  );
}
