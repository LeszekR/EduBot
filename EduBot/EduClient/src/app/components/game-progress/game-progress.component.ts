import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { GameScore } from '../../models/game-score';


// ==================================================================================================================
@Component({
  selector: 'progress-comp',
  templateUrl: './game-progress.component.html',
  styleUrls: ['./game-progress.component.css']
})
export class GameProgressComponent implements OnInit {

  @Input() gameScore: GameScore;
  //TODO pasek życia

  // CONSTRUCTOR
  // ==============================================================================================================
  constructor(){}

  // --------------------------------------------------------------------------------------------------------------
  ngOnInit(){  
  }
}