import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService } from './http.service';
import { Module } from '../models/module'

// ==================================================================================================================
@Injectable()
export class ModuleService {

    private moduleUrl = 'http://localhost:64365/api/module';

    editedModuleId: number;

    mockModules: Module[];


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(private http: HttpService) { }


    // PUBLIC
    // ==============================================================================================================
    getSimpleModules(): Observable<Module> {
        return this.http.get(this.moduleUrl + '/all')
            .map((res: Response) => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }
    // getSimpleModules(): Observable<Module> {
    //     return new Observable<Module>(this.http.getHttp(this.moduleUrl + '/all'));
    // }

    // --------------------------------------------------------------------------------------------------------------
    getSimpleModulesMock(): Module[] {
        let module1 = new Module();
        module1.id = 1;
        module1.name = 'Module 1';
        let module2 = new Module();
        module2.id = 2;
        module2.name = 'Module 2';
        let module3 = new Module();
        module3.id = 3;
        module3.name = 'Module 3';
        this.mockModules = [module1, module2, module3];
        return this.mockModules;
    }

    // --------------------------------------------------------------------------------------------------------------
    getModuleById(id: number): Observable<Module> {
        return this.http.get(this.moduleUrl + '/' + id)
            .map((res: Response) => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }

    // --------------------------------------------------------------------------------------------------------------
    getModuleByIdMock(id: number): Module {
        let module = this.mockModules[id - 1];

        console.log("module.id: " + module.id);

        switch (module.id) {
            case 1:
                module.material = "In HTML, JavaScript code must be inserted between <script> and </script> tags.\n" +
                    "Tags in HTML document mark the beginning and the end of definition of HTML element. HTML page is built from such elements. Each element can contain other elements. Here javascript code is such an element."
                    ;
                module.examples = `<script>
                    document.getElementById(demo).innerHTML = My First JavaScript;
                    </script>
                    `;
                break;
            case 2:
                module.material = "You can place any number of scripts in an HTML document.\n" +
                    "Scripts can be placed in the <body>, or in the <head> section of an HTML page, or in both.\n\n"
                "Scripts can be used by an HTML element when they are put in lines located before the element in the page code. It does not matter whether they are in the head or body section. You choose the section of the HTML document in which you will put the script according to your preferences, trying to make the code as easy to read and understand as possible."
                    ;
                module.examples = `<!DOCTYPE html>
                    <html>
                    <head>
                    <script>
                    function myFunction() {
                        document.getElementById(demo).innerHTML = Paragraph changed.;
                    }
                    </script>
                    </head>
                    <body>
                    <h1>A Web Page</h1>
                    <p id=demo>A Paragraph</p>
                    <button type=button onclick=myFunction()>Try it</button>
                    <script>
                    document.getElementById(demo).innerHTML = Original text in demo paragraph.;
                    </script>
                    </body>
                    </html>`
                    ;
                break;
            case 3:
                module.material = "Scripts can also be placed in external files:\n" +
                    "JavaScript files have the file extension .js.\n" +
                    "To use an external script, put the name of the script file in the src (source) attribute of a <script> tag.\n\n" +
                    "It is advisable to put your code in a .js file whenever the code is long and whenever it is going to be used by multiple HTML pages. If your code is really long you will put it in many files - as many as you think convenient. The general rule of thumb is to keep a single code file no longer than a few screens."
                    ;
                module.examples = `<!DOCTYPE html>
                    <html>
                    <body>
                    <script src=myScript.js></script>
                    </body>
                    </html>`
                    ;
                break;
        }
        return module;
    }

    // --------------------------------------------------------------------------------------------------------------
    saveModule(module: Module): Observable<Module> {
        let body = JSON.stringify(module);
        return this.http.post(this.moduleUrl, body)
            .map((res: Response) => res.json())
            .catch(error => {
                console.log(error);
                return Observable.throw(error);
            });
    }
}