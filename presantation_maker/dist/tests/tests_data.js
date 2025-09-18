"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMinimalPresentation = createMinimalPresentation;
exports.createMaximalPresentation = createMaximalPresentation;
function createMinimalPresentation() {
    const slide = {
        id: "slide-minimal",
        slideObjects: [],
        background: { type: 'color', color: "#ffffff" }
    };
    return {
        id: "presentation-minimal",
        title: "Минимальная презентация",
        slides: {
            slides: [slide],
            currentSlideId: "slide-minimal"
        }
    };
}
function createMaximalPresentation() {
    const text1 = {
        id: "text-1",
        type: "text",
        x: 100,
        y: 100,
        w: 200,
        h: 100,
        text: "Первый текст",
        fontSize: 14,
        fontFamily: "Arial",
        fontWeight: 400,
        textDecoration: "none",
        textAlign: "left",
        color: "#000000",
        shadow: {
            color: "#cccccc",
            blur: 5
        }
    };
    const text2 = {
        id: "text-2",
        type: "text",
        x: 300,
        y: 200,
        w: 250,
        h: 120,
        text: "Второй текст",
        fontSize: 18,
        fontFamily: "Times New Roman",
        fontWeight: 700,
        textDecoration: "underline",
        textAlign: "center",
        color: "#ff0000",
        shadow: {
            color: "#000000",
            blur: 3
        }
    };
    const image1 = {
        id: "image-1",
        type: "image",
        x: 150,
        y: 350,
        w: 300,
        h: 200,
        src: "photo1.jpg"
    };
    const image2 = {
        id: "image-2",
        type: "image",
        x: 500,
        y: 400,
        w: 250,
        h: 180,
        src: "photo2.png"
    };
    const background1 = { type: 'color', color: "#f0f0f0" };
    const background2 = { type: 'picture', src: "background.jpg" };
    const slide1 = {
        id: "slide-1",
        slideObjects: [text1, image1],
        background: background1
    };
    const slide2 = {
        id: "slide-2",
        slideObjects: [text2, image2],
        background: background2
    };
    return {
        id: "presentation-maximal",
        title: "Максимальная презентация",
        slides: {
            slides: [slide1, slide2],
            currentSlideId: "slide-1"
        }
    };
}
