import { IAsteroid } from "./asteroid";
import { IMiner } from "./miner";
import { IPlanet } from "./planet";

export interface IRefreshData {
  planets: IPlanet[];
  asteroids: {
    currentMiner?: IMiner;
    minerals: number;
    name: string;
    position: { x: number; y: number };
    status: number;
    _id: string;
  }[];
  miners: {
    _id: string;
    angle: number;
    carryCapacity: number;
    minerals: number;
    miningSpeed: number;
    name: string;
    planet: {
      position: { x: number; y: number };
      _id: string;
      name: string;
      minerals: number;
    };
    miners: number;
    position: { x: number; y: number };
    status: number;
    target: {
      position: { x: number; y: number };
      _id: string;
      name: string;
      minerals: number;
    };
    targetType: string;
    travelSpeed: number;
    x: number;
    y: number;
  }[];
}
