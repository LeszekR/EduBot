export class TestData {
    name: string;
    surname: string;
}

export class MockData {

    constructor(){}

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