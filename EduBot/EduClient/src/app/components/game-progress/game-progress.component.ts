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
  // private life: number;
  // private armour: number;
  // private numbers: number[];

  private score = this.context.gameScore;

  private readonly nLife = 20;
  private lifeSegments: number[] = [];

  private readonly shieldMax = 50;
  private readonly nShield = 5;
  private shieldSegments: number[] = [this.nShield];


  // CONSTRUCTOR
  // ==============================================================================================================
  constructor(private context: ContextService) { }

  // --------------------------------------------------------------------------------------------------------------
  ngOnInit() {
    // this.numbers = new Array();
    // for (let i = 1; i <= 100; ++i)
    //   this.numbers.push(i);

    // mMOCK =======================
    this.context.gameScore.life = 28;
    this.context.gameScore.shield = 43;
    // mMOCK =======================

    this.lifeSegments = new Array();
    for (let i = 1; i <= this.nLife; i++)
      this.lifeSegments.push(i * 100 / this.nLife);

    this.shieldSegments = new Array();
    for (let i = 1; i <= this.nShield; i++)
      this.shieldSegments.push(i * 50 / this.nShield);

    this.rank = MilitaryRank.Soldier;
  }


  // PRIVATE
  // ==============================================================================================================
  private segmentWidth(scoreMax: number, nSegMax: number, scoreValue: number, segValue: number) {

    let x = scoreMax / nSegMax;

    if (segValue <= scoreValue)
      return 100;

    let diff = segValue - scoreValue;
    if (diff < x)
      return (x-diff) / x * 100;

    return 0;
  }
}	