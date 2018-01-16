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
  private life: number;	// 0 - 10
  private armour: number;

  // CONSTRUCTOR
  // ==============================================================================================================
  constructor(){}

  // --------------------------------------------------------------------------------------------------------------
  ngOnInit(){ 
	this.rank = MilitaryRank.Soldier;
	this.life = 7;
  }
}	