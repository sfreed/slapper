import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { FighterService } from '../core/services/fighter.service';
import { Fighter } from '../core/models/fighter.model';

@Component({
  selector: 'app-fighters',
  templateUrl: './fighters.component.html',
  styleUrls: ['./fighters.component.css']
})
export class FightersComponent implements OnInit {
  datasource: any;

  view: boolean = false;

  selectedFighter: Fighter = new Fighter();

  constructor(fighterService: FighterService) { 
    this.datasource = new CustomStore({
      key: "id",
      loadMode: "raw",
      load: function (loadOptions: any) {
        return new Promise((resolve) => {
          fighterService.getFighters().subscribe(snaps => {
            resolve(snaps);
          })
        });
      },
      insert: function(fighter: any){
        return fighterService.createFighter(fighter);
      },
      update: function (id: string, fighter: Fighter){
        return fighterService.updateFighter(id, fighter);
      },
      remove: function (id: any) {
        return fighterService.deleteFighter(id);
      },
    });
  }

  ngOnInit(): void {
  }

  onRowUpdating(options: any) {
    options.newData = Object.assign(options.oldData, options.newData);
  }

  displayFightHistory(e){
    this.selectedFighter = e.row.data;
    
    this.view = true
  }

  close(){
    this.view = false
  }
}
