import { Component } from '@angular/core';
import { FighterService } from '../fighters/fighter.service';
import { Fighter } from '../models/fighter.model';
import { RoundResult } from '../models/round_result.model';
import notify from 'devextreme/ui/notify';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent {
  datasource:any;

  round_results: RoundResult[] = [];

  fighter1: Fighter;

  fighter2: Fighter;

  round: number = 1;

  constructor(public fighterService: FighterService) { 
    this.datasource = new CustomStore({
      key: "id",
      loadMode: "raw",
      load: function (loadOptions: any) {
        return new Promise((resolve, reject) => {
          fighterService.getFighters().subscribe(snaps => {
            resolve(snaps);
          })
        });
      }
    });
  }

  startBattle(){
    if(this.fighter1 && this.fighter2){

      this.resetBattle();
      
      let firstAttacker: Fighter = this.fighter1; 
      let secondAttacker: Fighter = this.fighter2; 

      if(this.generateWeightedRandomResult(this.fighter1.initiative) < 
          this.generateWeightedRandomResult(this.fighter2.initiative)){
        firstAttacker = this.fighter2; 
        secondAttacker = this.fighter1; 
      }
  
      this.logRoundResult('Fighter ' + firstAttacker.name + ' Attacking First');
  
      this.fightRound(firstAttacker, secondAttacker);      
    } else {
      notify('Please select 2 Fighters', 'error', 2000);
    } 
  }

  fightRound(fighter1: Fighter, fighter2: Fighter) {
    let fighter1AttackCount: number  = fighter1.attacks;
    let fighter2AttackCount: number  = fighter2.attacks;

    while(fighter1AttackCount > 0 || fighter2AttackCount > 0){
      if(fighter1AttackCount-- > 0){

        this.attack(fighter1, fighter2);

        if(fighter2.battlehealth <= 0){
          this.logRoundResult('Fight Over - ' + fighter2.name + ' killed');
          return;
        }
      }

      if(fighter2AttackCount-- > 0){

        this.attack(fighter2, fighter1);

        if(fighter1.battlehealth <= 0){
          this.logRoundResult('Fight Over - ' + fighter1.name + ' killed');
          return;
        }
      }
    }

    this.logRoundResult('End of Round Results: ' + fighter1.name + ' (' + fighter1.battlehealth +
      ') -vs- ' + fighter2.name + ' (' + fighter2.battlehealth + ')')

    this.round++;

    return this.fightRound(fighter1, fighter2);
  }

  attack(attacker: Fighter, defender: Fighter){
    if(defender.dodge >= this.generateWeightedRandomResult(0)){
      this.logRoundResult(defender.name + ' dodged attack from ' + attacker.name);

    } else {
      if(defender.critical >= this.generateWeightedRandomResult(0)){
        this.logRoundResult(attacker.name + ' hits '+ defender.name +' for ' + 
        (attacker.damage*2) +' *Critical* damage (' + defender.battlehealth + ' -> '+ 
          (defender.battlehealth - (attacker.damage*2)) +')');
        
        defender.battlehealth = defender.battlehealth - (attacker.damage*2);
      } else {
        this.logRoundResult(attacker.name + ' hits '+ defender.name +' for ' + 
          attacker.damage +' damage (' + defender.battlehealth + '-> ' + 
            (defender.battlehealth - (attacker.damage)) +')');

        defender.battlehealth = defender.battlehealth - (attacker.damage);
      }
    }
  }

  logRoundResult(message: string){
    let round_result: RoundResult = new RoundResult();
    round_result.message = message;
    round_result.round = this.round;          
    this.round_results.push(round_result);
  }

  resetBattle(){
    this.fighter1.battlehealth = this.fighter1.health;
    this.fighter2.battlehealth = this.fighter2.health;
    this.round = 1;
    this.round_results = [];
  }

  generateWeightedRandomResult(weight:number): number{
      let r: number = Math.floor(Math.random() * 100) + 1;
      let w: number = r * weight/100;
      return r + w;
  }
}
