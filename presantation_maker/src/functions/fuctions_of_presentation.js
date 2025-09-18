"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = generateId;
exports.renamePresentation = renamePresentation;
exports.removeSlide = removeSlide;
exports.addSlide = addSlide;
exports.changeSlidePosition = changeSlidePosition;
exports.addText = addText;
exports.addImage = addImage;
exports.removeObject = removeObject;
exports.changeObjectPosition = changeObjectPosition;
exports.changeObjectSize = changeObjectSize;
exports.changeText = changeText;
exports.changeTextSize = changeTextSize;
exports.changeFontFamily = changeFontFamily;
exports.changeSlideBackground = changeSlideBackground;
const types_of_presantation_js_1 = require("../types/types_of_presantation.js");
const const_for_presantation_ts_1 = require("../types/const_for_presantation.ts");
function generateId() {
    return crypto.randomUUID();
}
function renamePresentation(presentation, newTitle) {
    return {
        ...presentation,
        title: newTitle
    };
}
function removeSlide(presentation, slideId) {
    const newSlides = presentation.slides.slides.filter(slide => (slide.id !== slideId));
    let newCurrentSlideId;
    if (presentation.slides.currentSlideId === slideId) {
        if (newSlides.length > 0) {
            newCurrentSlideId = newSlides[0].id;
        }
        else {
            newCurrentSlideId = null;
        }
    }
    else {
        newCurrentSlideId = presentation.slides.currentSlideId;
    }
    return {
        ...presentation,
        slides: {
            ...presentation.slides,
            slides: newSlides,
            currentSlideId: newCurrentSlideId
        }
    };
}
function addSlide(presentation) {
    const newSlide = {
        id: generateId(),
        slideObjects: [],
        background: const_for_presantation_ts_1.DEFAULT_BACKGROUND
    };
    const newSlides = [...presentation.slides.slides, newSlide];
    return {
        ...presentation,
        slides: {
            ...presentation.slides,
            slides: newSlides,
            currentSlideId: newSlide.id
        }
    };
}
function changeSlidePosition(presentation, slideId, newPosition) {
    const slides = [...presentation.slides.slides];
    const slideIndex = slides.findIndex(slide => slide.id === slideId);
    if (slideIndex === -1) {
        return presentation;
    }
    const [movedSlide] = slides.splice(slideIndex, 1);
    slides.splice(newPosition, 0, movedSlide);
    return {
        ...presentation,
        slides: {
            ...presentation.slides,
            slides: slides
        }
    };
}
function addText(slide, x = const_for_presantation_ts_1.DEFAULT_POSITIONS.X, y = const_for_presantation_ts_1.DEFAULT_POSITIONS.Y, text = "") {
    const newText = {
        id: generateId(),
        type: "text",
        x,
        y,
        w: const_for_presantation_ts_1.TEXT_OBJECT_DEFAULTS.WIDTH,
        h: const_for_presantation_ts_1.TEXT_OBJECT_DEFAULTS.HEIGHT,
        text,
        fontSize: const_for_presantation_ts_1.TEXT_OBJECT_DEFAULTS.FONT_SIZE,
        fontFamily: const_for_presantation_ts_1.TEXT_OBJECT_DEFAULTS.FONT_FAMILY,
        fontWeight: const_for_presantation_ts_1.TEXT_OBJECT_DEFAULTS.FONT_WEIGHT,
        textDecoration: const_for_presantation_ts_1.TEXT_OBJECT_DEFAULTS.TEXT_DECORATION,
        textAlign: const_for_presantation_ts_1.TEXT_OBJECT_DEFAULTS.TEXT_ALIGN,
        color: const_for_presantation_ts_1.TEXT_OBJECT_DEFAULTS.COLOR,
        shadow: {
            color: const_for_presantation_ts_1.TEXT_OBJECT_DEFAULTS.SHADOW.COLOR,
            blur: const_for_presantation_ts_1.TEXT_OBJECT_DEFAULTS.SHADOW.BLUR
        }
    };
    return {
        ...slide,
        slideObjects: [...slide.slideObjects, newText]
    };
}
function addImage(slide, x = const_for_presantation_ts_1.DEFAULT_POSITIONS.X, y = const_for_presantation_ts_1.DEFAULT_POSITIONS.Y, src) {
    const newImage = {
        id: generateId(),
        type: "image",
        x,
        y,
        w: const_for_presantation_ts_1.IMAGE_OBJECT_DEFAULTS.WIDTH,
        h: const_for_presantation_ts_1.IMAGE_OBJECT_DEFAULTS.HEIGHT,
        src
    };
    return {
        ...slide,
        slideObjects: [...slide.slideObjects, newImage]
    };
}
function removeObject(slide, objectId) {
    const newObjects = slide.slideObjects.filter(obj => obj.id !== objectId);
    return {
        ...slide,
        slideObjects: newObjects
    };
}
function changeObjectPosition(slide, objectId, newX, newY) {
    const newObjects = slide.slideObjects.map(obj => {
        if (obj.id === objectId) {
            return { ...obj, x: newX, y: newY };
        }
        return obj;
    });
    return {
        ...slide,
        slideObjects: newObjects
    };
}
function changeObjectSize(slide, objectId, newWidth, newHeight) {
    const newObjects = slide.slideObjects.map(obj => {
        if (obj.id === objectId) {
            return { ...obj, w: newWidth, h: newHeight };
        }
        return obj;
    });
    return {
        ...slide,
        slideObjects: newObjects
    };
}
function changeText(slide, objectId, newText) {
    const newObjects = slide.slideObjects.map(obj => {
        if (obj.id === objectId && obj.type === "text") {
            return { ...obj, text: newText };
        }
        return obj;
    });
    return {
        ...slide,
        slideObjects: newObjects
    };
}
function changeTextSize(slide, objectId, newSize) {
    const newObjects = slide.slideObjects.map(obj => {
        if (obj.id === objectId && obj.type === "text") {
            return { ...obj, fontSize: newSize };
        }
        return obj;
    });
    return {
        ...slide,
        slideObjects: newObjects
    };
}
function changeFontFamily(slide, objectId, newFont) {
    const newObjects = slide.slideObjects.map(obj => {
        if (obj.id === objectId && obj.type === "text") {
            return { ...obj, fontFamily: newFont };
        }
        return obj;
    });
    return {
        ...slide,
        slideObjects: newObjects
    };
}
function changeSlideBackground(slide, background) {
    return {
        ...slide,
        background: background
    };
}
//# sourceMappingURL=fuctions_of_presentation.js.map