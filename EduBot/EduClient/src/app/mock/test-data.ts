import { ClosedQuestion } from '../models/quiz-model/closed-question';
import { CodeTask } from '../models/quiz-model/code-task';


export class TestData {
    name: string;
    surname: string;
}

export class MockData {

    constructor() { }

    public mockCodeTasks: CodeTask[] = [
        <CodeTask>{
            question: "Napisz program, który włamuje się do serwerwa PG i zalicza dyplom wskazanego studenta.",
            correct_result: "{'ocena': '5', 'oferty_pracy': '84', 'proponowane_wynagrodzenie': '150.000'}",
            executor_code: `"<!DOCTYPE html>
            <html>
                <head>
                    <title>TODO supply a title</title>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <script src="saper.js"></script>
            
                    <link rel="stylesheet" type="text/css" href="saper.css">
            
                </head>
                <body onload="init()">
                    <div>
                        <div id="menu">
                            <div id="opisy">
            "`
        },
        <CodeTask>{
            question: "Zaprogramuj wyrzynarkę do marchwi w JavaScript",
            correct_result: "8 średnich marchwi na minutę | 5 dużych",
            executor_code: `"    <body onload="init()">
            <div>
                <div id="menu">
                    <div id="opisy">
                        <div>
                            <label class="opisPola" for="txRyzyko">Poziom ryzyka</label>
                        </div>
                        <div>
                            <label class="opisPola" for="boardSize">Rozmiar planszy</label>
                        </div>
                    </div>
                    <div id="polaText">
                        <div>
                            <input type="text" id="txRyzyko" autofocus>
                        </div>
                        <div>
                            <input type="text" id="boardSize" onchange="generateNewBoard()">
                        </div>
                    </div>
                </div>
    
                <div id="gra">
                    <div><input type="button" value="Generuj planszę" accesskey="g" onclick="generateNewBoard()"></div>
                    <div id="lewy" style="float:left"></div>
                    <div id="board"  style="float:left"></div>
                    <div id="prawy"  style="float:left"></div>
                </div>
    
            </div>
    "`
        },
        <CodeTask>{
            question: "Napisz przeszukiwanie w głąb planu zajęć PG oparte na kopcu Fibonacciego, nie stosując znaku '=', wykorzystując drzewo binarne czarno-czerowno-seledynowe, zoptymalizowane dla branek OR, XOR i XEROX oraz zwracające wynik w postaci XML w base64 w UTF-51, z ponięciem znaków o indeksach liczb pierwszych.",
            correct_result: "Łatwizna. Ale dajcie dziennym, połowa popełni samobójstwo zanim skończy czytać polecenie.",
            executor_code: "Po co. Rzut oka na wynik i będzie przecież widać czy jest ok."
        },
        <CodeTask>{
            question: "Wykorzystując przekazywanie zmiennej przez referencję oraz wielokrotne dziedziczenie diamentowe oblicz sumę.",
            correct_result: "5",
            executor_code: "Nie ma sensu bo każdy procesor się na tym spali. Niech się student męczy, przecież tego się nie da, hi, hi..."
        }
    ];


    public mockQuestions: ClosedQuestion[] = [
        <ClosedQuestion>{
            question: "Chromolęta - cena, wypłostki i 3 podstawowe zastosowania. Wyjasnij mechanizm namnażania, opisz przydaczki niewklęsłe, maszynowane do wciór.",
            correct_idx: 0,
            answers: ["1 buś, wypłaszanie, kronowanie i chuśtkowanie", "4 duże konie, krowa, stado lemurów giętkich i rurka-gazówka", "200 kun, wygonne podkopy umacniane szkliwem", "nie wiem"]
        },
        <ClosedQuestion>{
            question: "Grube bale leżą na łące. Kto je poprzynosił, dlaczego i jak zostaną później pocieniowane?",
            correct_idx: 1,
            answers: ["Bysio z Dużej, nie zostaną w ogóle.", "Ludzie z bagna to przyniesli! to nie my!", "Stefan. To zawsze on, przecie waidomo."]
        },
        <ClosedQuestion>{
            question: "Jaka jest kaczka?",
            correct_idx: 2,
            answers: ["mała", "duża", "nijaka", "nie wiem"]
        },
        <ClosedQuestion>{
            question: "Wór kostek małych to w podstawowej wersji jest:",
            correct_idx: 3,
            answers: ["żywnośc dla kota", "żywność dla marynarzy na morzu", "chrzęszcząca trzęsawka akustyczna", "masażer de luxe bez intsrukcji"]
        }
    ];



    public mockModules = {
        1: {
            content:
                "In HTML, JavaScript code must be inserted between <script> and </script> tags.\n" +
                "Tags in HTML document mark the beginning and the end of definition of HTML element. HTML page is built from such elements. Each element can contain other elements. Here javascript code is such an element."
            ,
            example:
                `<script>
            document.getElementById(demo).innerHTML: My First JavaScript,
            </script>
            `,
        },
        2: {
            content:
                "You can place any number of scripts in an HTML document.\n" +
                "Scripts can be placed in the <body>, or in the <head> section of an HTML page, or in both.\n\n" +
                "Scripts can be used by an HTML element when they are put in lines located before the element in the page code. It does not matter whether they are in the head or body section. You choose the section of the HTML document in which you will put the script according to your preferences, trying to make the code as easy to read and understand as possible."
            ,
            example:
                `<!DOCTYPE html>
            <html>
            <head>
            <script>
            function myFunction() {
                document.getElementById(demo).innerHTML: Paragraph changed.,
            }
            </script>
            </head>
            <body>
            <h1>A Web Page</h1>
            <p id=demo>A Paragraph</p>
            <button type=button onclick=myFunction()>Try it</button>
            <script>
            document.getElementById(demo).innerHTML: Original text in demo paragraph.,
            </script>
            </body>
            </html>`
            ,
        },
        3: {
            content:
                "Scripts can also be placed in external files:\n" +
                "JavaScript files have the file extension .js.\n" +
                "To use an external script, put the name of the script file in the src (source) attribute of a <script> tag.\n\n" +
                "It is advisable to put your code in a .js file whenever the code is long and whenever it is going to be used by multiple HTML pages. If your code is really long you will put it in many files - as many as you think convenient. The general rule of thumb is to keep a single code file no longer than a few screens."
            ,
            example:
                `<!DOCTYPE html>
            <html>
            <body>
            <script src=myScript.js></script>
            </body>
            </html>`
            ,
        }
    };
}