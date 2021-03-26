import { Fighter } from "./fighter.model";

export class Result{
  id: string = '';
  fighter1: Fighter = new Fighter();
  fighter2: Fighter = new Fighter();
  victor: Fighter = new Fighter();
}
