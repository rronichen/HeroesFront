 export interface Hero {
  id: string;
  name: string;
  ability: string;
  suitColor: string;
  startingPower: number;
  currentPower: number;
  dateLastTrain?: Date;
  timesTrainsToday?: number;
}
