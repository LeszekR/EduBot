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


  // CONSTRUCTOR
  // ==============================================================================================================
  constructor(){}

  // --------------------------------------------------------------------------------------------------------------
  ngOnInit(){  
  }
}