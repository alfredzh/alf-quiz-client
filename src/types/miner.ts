export enum MinerStatus {
  Idle,
  Traveling,
  Mining,
  Transfering,
}

export const MinerStatusMap = {
  [MinerStatus.Idle]: "Idle",
  [MinerStatus.Traveling]: "Traveling",
  [MinerStatus.Mining]: "Mining",
  [MinerStatus.Transfering]: "Transfering",
};

export interface IMiner {
  angle: number;
  carryCapacity: number;
  minerals: number;
  miningSpeed: number;
  name: string;
  planet: string;
  status: number;
  target: string;
  targetType: string;
  travelSpeed: number;
  x: number;
  y: number;
  _id: string;
}