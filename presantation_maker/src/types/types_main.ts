type presentation = {
    name: string;
    slides: Array<slide>;
}

type slide = {
    index: number;
    content: Array<string>;
    background: string;
    transition: string;
}

type slides = {
    currentSlide: number;
}

type highlighting = {
    highliteObject: string;
    possibleActions: Array<string>;
    
}