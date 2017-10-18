import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Models
import { TestType }     from '../../models/enum-test-type';
import { DiffLevel }    from '../../models/enum-diff-level';
import { Module }       from '../../models/module';

//Services
import { ModuleService }    from '../../services/module.service';
import { ContextService }   from '../../services/context.service';

//Components
import { ContentViewComponent } from './content-view/content-view.component';
import { ExampleViewComponent } from './example-view/example-view.component';


// ==================================================================================================================
@Component({
  selector: 'game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['game-view.component.css']
})
export class GameViewComponent implements OnInit {

  @ViewChild(ContentViewComponent)
  private contentComponent: ContentViewComponent;
  @ViewChild(ExampleViewComponent)
  private exampleComponent: ExampleViewComponent;

  private module: Module;
  private diffLevels = DiffLevel;

  private view: number;


  // CONSTRUCTOR
  // ==============================================================================================================
  constructor(
    private route: ActivatedRoute, 
    private moduleService: ModuleService, 
    private context: ContextService) { }


  // PUBLIC
  // ==============================================================================================================
  ngOnInit() {
    this.view = 1;
    this.route.data
      .subscribe((data: { module: any }) => {
        this.module = data.module;
      });
  }

  changeView(){
    if(this.view == 1)
      this.view = 2;
    else
      this.view = 1;
  }

  // --------------------------------------------------------------------------------------------------------------
  save() {
  // TODO : pobrać wszystkie zastępcze dane z faktycznych pól edycji 

    this.module.id = this.context.editModuleId;
    this.module.id_group = 0;   // TODO: pobrac z pola edycji

    this.module.content = this.contentComponent.content;
    this.module.example = this.exampleComponent.example;

    this.module.testType = TestType.Choice;   // TODO: pobrac z pola edycji
    this.module.testTask = "próbne pytanie testowe";   // TODO: pobrac z pola edycji

    this.moduleService.saveModule(this.module).subscribe(res => this.module = res);

    this.context.editModuleId = null;
  }

  // --------------------------------------------------------------------------------------------------------------
  delete() {
    console.log("delete");
    this.context.editModuleId = null;
  }

  // --------------------------------------------------------------------------------------------------------------
  cancel() {
    this.moduleService.getModuleById(this.module.id).subscribe(res => this.module = res);
    this.context.editModuleId = null;
  }
}