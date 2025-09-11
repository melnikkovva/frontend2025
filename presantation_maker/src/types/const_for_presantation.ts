import { Background, TextDecoration, TextAlign } from "./types_of_presantation";

export const TEXT_OBJECT_DEFAULTS = {
    WIDTH: 200,
    HEIGHT: 100,
    FONT_SIZE: 14,
    FONT_FAMILY: "Gill Sans",
    FONT_WEIGHT: 400,
    TEXT_DECORATION: "none" as TextDecoration, 
    TEXT_ALIGN: "left" as TextAlign, 
    COLOR: "#000000",
    SHADOW: {
        COLOR: "#000000",
        BLUR: 0
    }
};

export const IMAGE_OBJECT_DEFAULTS = {
    WIDTH: 300,
    HEIGHT: 200
};

export const DEFAULT_BACKGROUND: Background = { 
    type: 'color', 
    color: "#ffffff" 
};

export const DEFAULT_POSITIONS = {
    X: 100,
    Y: 100
};