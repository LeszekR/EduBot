import { Component, Input }        from '@angular/core'
import { FormField }               from './form-field'

@Component({
    selector: 'formfield',
    templateUrl: './form-field.component.html',
    styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent {
    @Input() field: FormField;
    
    // constructor(
    //     // private widthLabel: number = 150,
    //     // private widthInput: number = 200,
    //     // private heightInput: number = 30
    // ) { 
    // }
}