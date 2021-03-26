import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit {
  title = 'slapper';

  tabs: Tab[] = [{
    id: 0,
    icon: "user",
    template: "Matches", 
  },{
    id: 1,
    icon: "user",
    template: "Fighters", 
  }];

  public selectedTab: string = 'Matches';
  
  constructor(){}

  ngOnInit(){
    
  }

  selectTab(e: any){
    console.log(e)
    this.selectedTab = e.itemData.template;
  }
  
}

export class Tab {
  id: number=0;
  icon: string='';
  template: string='';
}