export type Presentation = {
    id: string;
    title: string;
    slides: Slides;
}

export type Slide = {
    id: string;
    slideObjects: Array<SlideObject>;
    background: Background;
}

type SlideObject = TextObject | ImageObject

export type Background = Color | Picture

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

export type Selection = {
    slideId: string;
    objectId: string;
    typeElement: 'text' | 'image' |'none';
}

export type TextDecoration = 'underline' | 'line-through' | 'none';
export type TextAlign = 'left' | 'center' | 'right' | 'justify';

export type TextObject = BaseSlideObject & {
    type: 'text';
    text: string;
    fontSize: number;
    fontFamily: string;
    fontWeight: number;
    textDecoration: TextDecoration;
    textAlign: TextAlign;
    color: string;
    shadow: {
        color: string;
        blur: number;
    }
}

export type ImageObject = BaseSlideObject & {
    type: 'image';
    src: string;
}

type BaseSlideObject = {
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
}