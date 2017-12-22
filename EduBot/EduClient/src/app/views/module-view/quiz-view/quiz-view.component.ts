import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ClosedQuestion } from '../../../models/closed-question';


// ==================================================================================================================
@Component({
  selector: 'quiz-view',
  templateUrl: './quiz-view.component.html',
  styles: [
    `
        fieldset {
          border: 1px solid #ddd !important;
          margin: 0;
          min-width: 0;
          padding: 10px;       
          position: relative;
          border-radius:4px;
          background-color:#B5CCF6 !important;
          padding-left:10px!important;
      }	
      
      legend {
          font-size:14px;
          font-weight:bold;
          margin-bottom: 0px; 
          width: 35%; 
          border: 1px solid #ddd;
          border-radius: 4px; 
          padding: 5px 5px 5px 10px; 
          background-color: #ffffff;
      }

      .bg-card{
          background-color:#B5CCF6;
      }
    `
  ]
})
export class QuizViewComponent {

  @Input() questions: ClosedQuestion[];
  @Input() readonly: boolean;

  
  // CONSTRUCTOR
  // ==============================================================================================================


  // PUBLIC
  // ==============================================================================================================


  // PRIVATE
  // ==============================================================================================================
}