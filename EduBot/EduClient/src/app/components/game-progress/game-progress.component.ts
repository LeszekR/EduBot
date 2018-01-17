import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { GameScore } from '../../models/game-score';
import { MilitaryRank } from '../../models/enums';
import { ContextService } from '../../services/context.service';


// ==================================================================================================================
@Component({
  selector: 'progress-comp',
  templateUrl: './game-progress.component.html',
  styleUrls: ['./game-progress.component.css']
})
export class GameProgressComponent implements OnInit {

  @Input() gameScore: GameScore;
  
  private rank: MilitaryRank;
  private life: number;
  private armour: number;

  private numbers: number[];

  private score = this.context.gameScore;
  private lifeSects = 20;
  private shieldSects = 5;
  

  // CONSTRUCTOR
  // ==============================================================================================================
  constructor(private context: ContextService){}

  // --------------------------------------------------------------------------------------------------------------
  ngOnInit(){
	this.numbers = new Array();
	for(let i = 1; i <= 100; ++i)
		this.numbers.push(i);

	this.rank = MilitaryRank.Soldier;
	this.life = 50;
	this.armour = 100;
  }
}	