import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { GameScore } from '../../models/game-score';
import { MilitaryRank } from '../../models/enums';


// ==================================================================================================================
@Component({
  selector: 'progress-comp',
  templateUrl: './game-progress.component.html',
  styleUrls: ['./game-progress.component.css']
})
export class GameProgressComponent implements OnInit {

  @Input() gameScore: GameScore;
  
  private rank: MilitaryRank;
  private health: number;
  private armour: number;
  private Math: any;

  // CONSTRUCTOR
  // ==============================================================================================================
  constructor(){}

  // --------------------------------------------------------------------------------------------------------------
  ngOnInit(){
    this.rank = MilitaryRank.Soldier;
    this.health = 100;
    this.armour = 100;
  }

  private getArmourWidth(num: number){
    num = num * 20;
    if(num <= this.armour)
      return '32px';
    else if(num - 20 < this.armour){
      this.Math = Math;
      let modulo = this.armour % 20;
      let width = this.Math.round(32 * modulo / 20);
      return width + 'px';
    }
    return '0px';
  }
}	