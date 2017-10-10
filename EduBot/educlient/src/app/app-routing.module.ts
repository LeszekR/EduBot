import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppModule } from './app.module';

//Components
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome-comp/welcome.component';
import { GameViewComponent } from './components/game-view/game-view.component';

//Resolvers
import { ModuleResolver } from './resolvers/module.resolver';

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'module/:moduleId', component: GameViewComponent,
        data: {},
        resolve: {
            module: ModuleResolver
        },
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [ ModuleResolver ]
})
export class AppRoutingModule { }