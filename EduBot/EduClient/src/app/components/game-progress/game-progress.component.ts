import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { GameScore } from '../../models/game-score';
// import { MilitaryRank } from '../../models/enums';
import { ContextService } from '../../services/context.service';
import { ModuleService } from '../../services/module.service';


// ====================================================================================================
@Component({
  selector: 'progress-comp',
  templateUrl: './game-progress.component.html',
  styleUrls: ['./game-progress.component.css']
})
export class GameProgressComponent implements OnInit {

  @Input() gameScore: GameScore;
  // @ViewChild('fieldMap') fieldMap: HTMLDivElement;
  @Input() nEasyModules: number;

  private readonly nLife = 20;
  private lifeSegments: number[] = [];

  private readonly shieldMax = 50;
  private readonly nShield = 5;
  private shieldSegments: number[] = [this.nShield];

  private mapRows: number = 5;
  private mapCols: number = 30;
  private mapZones: number[][];


  // CONSTRUCTOR
  // ==================================================================================================
  constructor(
    private context: ContextService,
    private moduleService: ModuleService
  ) { }

  // --------------------------------------------------------------------------------------------------
  ngOnInit() {
    this.lifeSegments = new Array();
    for (let i = 1; i <= this.nLife; i++)
      this.lifeSegments.push(i * 100 / this.nLife);

    this.shieldSegments = new Array();
    for (let i = 1; i <= this.nShield; i++)
      this.shieldSegments.push(i * 50 / this.nShield);

    this.mapZones = [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,]
    ];

    this.fillMap();
  }

  // --------------------------------------------------------------------------------------------------
  ngAfterViewInit() {
    // let nZones = this.context.moduleList.modules.filter(m => m.difficulty == 'easy').length;
  }


  // PRIVATE
  // ==================================================================================================
  private getRow(i: number) {
    return this.mapZones[i];
  }

  private fillMap() {

    this.moduleService.countEasyModules()
      .subscribe(n => {

        let mapHeight = 1;
        let mapWidth = 6;

        let nModulesInZone = n / mapWidth * mapHeight;
        let zoneSqrRoot = Math.ceil(Math.sqrt(nModulesInZone));
        this.mapRows = mapHeight * zoneSqrRoot;
        this.mapCols = mapWidth * zoneSqrRoot;

        this.mapZones = new Array();
        for (var row = 0; row < this.mapRows; row++) {
          let rowArr: number[] = new Array();
          for (var col = 1; col <= this.mapCols; col++)
            rowArr.push(row * this.mapCols + col);
          this.mapZones.push(rowArr);
        }
      })
  }

  // --------------------------------------------------------------------------------------------------
  private segmentClass(segment: number) {
    if (segment <= this.context.gameScore.shield)
      return 'shield-full';
    return 'shield-empty';
  }

  // --------------------------------------------------------------------------------------------------
  private segmentWidth(scoreMax: number, nSegMax: number, scoreValue: number, segValue: number) {

    let x = scoreMax / nSegMax;

    if (segValue <= scoreValue)
      return 100;

    let diff = segValue - scoreValue;
    if (diff < x)
      return (x - diff) / x * 100;

    return 0;
  }
}	