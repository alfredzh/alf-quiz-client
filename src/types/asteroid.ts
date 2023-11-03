export interface IAsteroid {
  currentMiner?: string;
  minerals: number;
  name: string;
  position: { x: number; y: number };
  status: number;
  _id: string;
}
