import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { GameScore } from '../../models/game-score';
// import { MilitaryRank } from '../../models/enums';
import { ContextService } from '../../services/context.service';
import { ModuleService } from '../../services/module.service';
import { ModuleResultDTO } from '../../models/module';


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

  private mapRows: number;
  private mapCols: number;
  // private mapZones: number[][];
  private mapZones: string[][];
  moduleResultDtos: ModuleResultDTO[];


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

    this.fillMap();
  }

  // --------------------------------------------------------------------------------------------------
  ngAfterViewInit() {
    // let nZones = this.context.moduleList.modules.filter(m => m.difficulty == 'easy').length;
  }


  // PRIVATE
  // ==================================================================================================
  private lifeClass(segment: number) {
    if (segment > this.context.gameScore.life)
      return '';
    if (this.context.gameScore.life >= 75)
      return 'life-segm life-4';
    if (this.context.gameScore.life >= 50)
      return 'life-segm life-3';
    if (this.context.gameScore.life >= 25)
      return 'life-segm life-2';
    return 'life-segm life-1';
  }

  // --------------------------------------------------------------------------------------------------
  private getModuleId(columnN: number, rowN: number) {
    let index = columnN * this.mapRows + rowN;

    if (index >= this.moduleResultDtos.length)
      return -1;

    return this.moduleResultDtos[index].id;
  }

  // --------------------------------------------------------------------------------------------------
  private fieldClass(index: number) {
    if (index >= this.moduleResultDtos.length)
      return 'field-empty';

    let moduleResultDto = this.moduleResultDtos[index];

    if (moduleResultDto.noQuizCode)
      return 'field-safe';

    let solvedCodes = moduleResultDto.solvedCodes;
    let solvedQuestions = moduleResultDto.solvedQuestions;
    // return (solvedCodes && solvedQuestions) ? 'field-safe' : 'field-mined';
    let classResult = (solvedCodes && solvedQuestions) ? 'field-safe' : 'field-mined'; 
    return classResult;
  }

  // --------------------------------------------------------------------------------------------------
  public fillMap() {

    this.moduleService.allUserEasyModules()
      .subscribe(moduleResultDtos => {

        this.moduleResultDtos = moduleResultDtos;
        let n = moduleResultDtos.length;

        let mapHeight = 1;
        let mapWidth = 6;

        // single column length
        let nModulesInZone = n / mapWidth * mapHeight;
        let zoneSqrRoot = Math.ceil(Math.sqrt(nModulesInZone));

        // number of rows
        this.mapRows = mapHeight * zoneSqrRoot;

        // number of columns
        let totalN = mapWidth * zoneSqrRoot * zoneSqrRoot;
        let tail = Math.floor((totalN - n) / this.mapRows);
        let trimmedN = totalN / this.mapRows - tail;
        this.mapCols = trimmedN;

        // map-fields array
        this.mapZones = new Array();
        for (var col = 0; col < this.mapCols; col++) {
          // let rowArr: number[] = new Array();
          let rowArr: string[] = new Array();

          // assigning each map-field its data-module-id = its 'easy' module's id
          let index;
          for (var row = 0; row < this.mapRows; row++) {
            index = col * this.mapRows + row;
            rowArr.push(this.fieldClass(index));
          }

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