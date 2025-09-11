type Presentation = {
    id: string;
    title: string;
    slides: Slides;
}

type Slide = {
    id: string;
    slideObjects: Array<SlideObject>;
    background: Background;
}

type SlideObject = TextObject | ImageObject

type Background = Color | Picture

type Color = {
    type: 'color';
    color: string
}

type Picture = {
    type: 'picture';
    src: string;
}

type Slides = {
    slides: Slide[];
    currentSlideId: string | null;
}

type Highlighting = {
    Slide: number;
    typeElement: 'text' | 'image' |'none';
}

type TextObject = DefaultObject & {
    type: 'text';
    text: string;
    fontSize: number;
    fontFamily: string;
    fontWeight: number;
    textDecoration: 'underline' | 'line-through' | 'none';
    textAlign: 'left' | 'center' | 'right' | 'justify';
    color: string;
    shadow: {
        color: string;
        blur: number;
    }
}

type ImageObject = DefaultObject & {
    type: 'image';
    src: string;
}

type DefaultObject = {
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
}