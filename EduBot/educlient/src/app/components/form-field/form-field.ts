export class FormField {    
    public label: string;
    public text: string;
    public required: boolean;


    constructor (
        label: string,
        text: string,
        required: boolean
    ) {
        this.label = label;
        this.text = text;
        this.required = required;
    }
}