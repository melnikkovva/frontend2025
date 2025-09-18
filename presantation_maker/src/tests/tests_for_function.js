"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testMinimalData = testMinimalData;
exports.testMaximalData = testMaximalData;
const types_of_presantation_1 = require("../types/types_of_presantation");
const fuctions_of_presentation_1 = require("../functions/fuctions_of_presentation");
const tests_data_1 = require("./tests_data");
function testMinimalData() {
    console.log("тесты с мин данными");
    const presentation = (0, tests_data_1.createMinimalPresentation)();
    const slide = presentation.slides.slides[0];
    const renamed = (0, fuctions_of_presentation_1.renamePresentation)(presentation, "Новое название");
    console.log("Изменение названия:", renamed.title === "Новое название");
    const withNewSlide = (0, fuctions_of_presentation_1.addSlide)(presentation);
    console.log("Добавление слайда:", withNewSlide.slides.slides.length === 2);
    const movedSlide = (0, fuctions_of_presentation_1.changeSlidePosition)(presentation, slide.id, 0);
    console.log("Перемещение слайда:", movedSlide.slides.slides[0].id === slide.id);
    const withText = (0, fuctions_of_presentation_1.addText)(slide, 50, 50, "Тестовый текст");
    console.log("Добавление текста:", withText.slideObjects.length === 1);
    const withImage = (0, fuctions_of_presentation_1.addImage)(slide, 100, 100, "test.jpg");
    console.log("Добавление изображения:", withImage.slideObjects.length === 1);
    const textSlide = (0, fuctions_of_presentation_1.addText)(slide, 50, 50, "Удалить этот текст");
    const objectId = textSlide.slideObjects[0].id;
    const afterRemove = (0, fuctions_of_presentation_1.removeObject)(textSlide, objectId);
    console.log("Удаление объекта:", afterRemove.slideObjects.length === 0);
    const textForMove = (0, fuctions_of_presentation_1.addText)(slide, 50, 50, "Перемещаемый текст");
    const moveObjectId = textForMove.slideObjects[0].id;
    const afterMove = (0, fuctions_of_presentation_1.changeObjectPosition)(textForMove, moveObjectId, 200, 200);
    const movedObj = afterMove.slideObjects.find(obj => obj.id === moveObjectId);
    console.log("Перемещение объекта:", movedObj?.x === 200 && movedObj?.y === 200);
    const afterSize = (0, fuctions_of_presentation_1.changeObjectSize)(textForMove, moveObjectId, 300, 150);
    const sizedObj = afterSize.slideObjects.find(obj => obj.id === moveObjectId);
    console.log("Изменение размера:", sizedObj?.w === 300 && sizedObj?.h === 150);
    const afterTextChange = (0, fuctions_of_presentation_1.changeText)(textForMove, moveObjectId, "Новый текст");
    const textObj = afterTextChange.slideObjects.find(obj => obj.id === moveObjectId);
    if (textObj && textObj.type === "text") {
        console.log("Изменение текста:", textObj.text === "Новый текст");
    }
    else {
        console.log("Изменение текста: false");
    }
    const afterTextSize = (0, fuctions_of_presentation_1.changeTextSize)(textForMove, moveObjectId, 20);
    const sizeObj = afterTextSize.slideObjects.find(obj => obj.id === moveObjectId);
    if (sizeObj && sizeObj.type === "text") {
        console.log("Изменение размера текста:", sizeObj.fontSize === 20);
    }
    else {
        console.log("Изменение размера текста: false");
    }
    const afterFont = (0, fuctions_of_presentation_1.changeFontFamily)(textForMove, moveObjectId, "Verdana");
    const fontObj = afterFont.slideObjects.find(obj => obj.id === moveObjectId);
    if (fontObj && fontObj.type === "text") {
        console.log("Изменение шрифта:", fontObj.fontFamily === "Verdana");
    }
    else {
        console.log("Изменение шрифта: false");
    }
    const newBackground = { type: 'color', color: "#ff0000" };
    const afterBackground = (0, fuctions_of_presentation_1.changeSlideBackground)(slide, newBackground);
    console.log("Изменение фона:", afterBackground.background.type === "color");
}
function testMaximalData() {
    console.log("тесты с макс данными");
    const presentation = (0, tests_data_1.createMaximalPresentation)();
    const slide1 = presentation.slides.slides[0];
    const slide2 = presentation.slides.slides[1];
    const textObject = slide1.slideObjects.find(obj => obj.type === "text");
    const imageObject = slide1.slideObjects.find(obj => obj.type === "image");
    const renamed = (0, fuctions_of_presentation_1.renamePresentation)(presentation, "Переименованная презентация");
    console.log("Изменение названия:", renamed.title === "Переименованная презентация");
    const afterRemove = (0, fuctions_of_presentation_1.removeSlide)(presentation, slide2.id);
    console.log("Удаление слайда:", afterRemove.slides.slides.length === 1);
    const withNewSlide = (0, fuctions_of_presentation_1.addSlide)(presentation);
    console.log("Добавление слайда:", withNewSlide.slides.slides.length === 3);
    const movedSlide = (0, fuctions_of_presentation_1.changeSlidePosition)(presentation, slide1.id, 1);
    console.log("Перемещение слайда:", movedSlide.slides.slides[1].id === slide1.id);
    if (textObject) {
        const afterTextChange = (0, fuctions_of_presentation_1.changeText)(slide1, textObject.id, "Обновленный текст");
        const updatedText = afterTextChange.slideObjects.find(obj => obj.id === textObject.id);
        if (updatedText && updatedText.type === "text") {
            console.log("Изменение текста:", updatedText.text === "Обновленный текст");
        }
        const afterTextSize = (0, fuctions_of_presentation_1.changeTextSize)(slide1, textObject.id, 24);
        const sizedText = afterTextSize.slideObjects.find(obj => obj.id === textObject.id);
        if (sizedText && sizedText.type === "text") {
            console.log("Изменение размера текста:", sizedText.fontSize === 24);
        }
        const afterFont = (0, fuctions_of_presentation_1.changeFontFamily)(slide1, textObject.id, "Courier New");
        const fontText = afterFont.slideObjects.find(obj => obj.id === textObject.id);
        if (fontText && fontText.type === "text") {
            console.log("Изменение шрифта:", fontText.fontFamily === "Courier New");
        }
    }
    if (imageObject) {
        const afterMove = (0, fuctions_of_presentation_1.changeObjectPosition)(slide1, imageObject.id, 500, 500);
        const movedImage = afterMove.slideObjects.find(obj => obj.id === imageObject.id);
        console.log("Перемещение изображения:", movedImage?.x === 500 && movedImage?.y === 500);
        const afterSize = (0, fuctions_of_presentation_1.changeObjectSize)(slide1, imageObject.id, 400, 300);
        const sizedImage = afterSize.slideObjects.find(obj => obj.id === imageObject.id);
        console.log("Изменение размера изображения:", sizedImage?.w === 400 && sizedImage?.h === 300);
    }
    const newBackground = { type: 'picture', src: "new-bg.jpg" };
    const afterBackground = (0, fuctions_of_presentation_1.changeSlideBackground)(slide1, newBackground);
    if (afterBackground.background.type === "picture") {
        console.log("Изменение фона:", afterBackground.background.src === "new-bg.jpg");
    }
}
//# sourceMappingURL=tests_for_function.js.map