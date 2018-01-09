import { NgModule } from '@angular/core';

//Pipes
import { EnumKeysPipe } from './pipes/enum-key.pipe';

@NgModule({
    declarations: [
        EnumKeysPipe
    ],
    exports:[
        EnumKeysPipe
    ],
    imports: [
        
    ],
    providers: [
      
    ]
  })
  export class SharedModule { }
  