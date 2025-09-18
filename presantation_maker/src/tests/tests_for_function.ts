import type { Background } from "../types/types_of_presantation";
import { renamePresentation, removeSlide, addSlide, changeSlidePosition, addText, addImage, removeObject, changeObjectPosition, changeObjectSize,changeText, changeTextSize, changeFontFamily, changeSlideBackground} from "../functions/fuctions_of_presentation";
import { createMinimalPresentation, createMaximalPresentation } from "./tests_data";

export function testMinimalData() {
    console.log("тесты с мин данными");
    
    const presentation = createMinimalPresentation();
    const slide = presentation.slides.slides[0];

    const renamed = renamePresentation(presentation, "Новое название");
    console.log("Изменение названия:", renamed.title === "Новое название");

    const withNewSlide = addSlide(presentation);
    console.log("Добавление слайда:", withNewSlide.slides.slides.length === 2);

    const movedSlide = changeSlidePosition(presentation, slide.id, 0);
    console.log("Перемещение слайда:", movedSlide.slides.slides[0].id === slide.id);

    const withText = addText(slide, 50, 50, "Тестовый текст");
    console.log("Добавление текста:", withText.slideObjects.length === 1);

    const withImage = addImage(slide, 100, 100, "test.jpg");
    console.log("Добавление изображения:", withImage.slideObjects.length === 1);

    const textSlide = addText(slide, 50, 50, "Удалить этот текст");
    const objectId = textSlide.slideObjects[0].id;
    const afterRemove = removeObject(textSlide, objectId);
    console.log("Удаление объекта:", afterRemove.slideObjects.length === 0);

    const textForMove = addText(slide, 50, 50, "Перемещаемый текст");
    const moveObjectId = textForMove.slideObjects[0].id;
    const afterMove = changeObjectPosition(textForMove, moveObjectId, 200, 200);
    const movedObj = afterMove.slideObjects.find(obj => obj.id === moveObjectId);
    console.log("Перемещение объекта:", movedObj?.x === 200 && movedObj?.y === 200);

    const afterSize = changeObjectSize(textForMove, moveObjectId, 300, 150);
    const sizedObj = afterSize.slideObjects.find(obj => obj.id === moveObjectId);
    console.log("Изменение размера:", sizedObj?.w === 300 && sizedObj?.h === 150);

    const afterTextChange = changeText(textForMove, moveObjectId, "Новый текст");
    const textObj = afterTextChange.slideObjects.find(obj => obj.id === moveObjectId);
    if (textObj && textObj.type === "text") {
        console.log("Изменение текста:", textObj.text === "Новый текст");
    } else {
        console.log("Изменение текста: false");
    }

    const afterTextSize = changeTextSize(textForMove, moveObjectId, 20);
    const sizeObj = afterTextSize.slideObjects.find(obj => obj.id === moveObjectId);
    if (sizeObj && sizeObj.type === "text") {
        console.log("Изменение размера текста:", sizeObj.fontSize === 20);
    } else {
        console.log("Изменение размера текста: false");
    }

    const afterFont = changeFontFamily(textForMove, moveObjectId, "Verdana");
    const fontObj = afterFont.slideObjects.find(obj => obj.id === moveObjectId);
    if (fontObj && fontObj.type === "text") {
        console.log("Изменение шрифта:", fontObj.fontFamily === "Verdana");
    } else {
        console.log("Изменение шрифта: false");
    }

    const newBackground: Background = { type: 'color', color: "#ff0000" };
    const afterBackground = changeSlideBackground(slide, newBackground);
    console.log("Изменение фона:", afterBackground.background.type === "color");
}

export function testMaximalData() {
    console.log("тесты с макс данными");
    
    const presentation = createMaximalPresentation();
    const slide1 = presentation.slides.slides[0];
    const slide2 = presentation.slides.slides[1];

    const textObject = slide1.slideObjects.find(obj => obj.type === "text");
    const imageObject = slide1.slideObjects.find(obj => obj.type === "image");

    const renamed = renamePresentation(presentation, "Переименованная презентация");
    console.log("Изменение названия:", renamed.title === "Переименованная презентация");

    const afterRemove = removeSlide(presentation, slide2.id);
    console.log("Удаление слайда:", afterRemove.slides.slides.length === 1);

    const withNewSlide = addSlide(presentation);
    console.log("Добавление слайда:", withNewSlide.slides.slides.length === 3);

    const movedSlide = changeSlidePosition(presentation, slide1.id, 1);
    console.log("Перемещение слайда:", movedSlide.slides.slides[1].id === slide1.id);

    if (textObject) {
        const afterTextChange = changeText(slide1, textObject.id, "Обновленный текст");
        const updatedText = afterTextChange.slideObjects.find(obj => obj.id === textObject.id);
        if (updatedText && updatedText.type === "text") {
            console.log("Изменение текста:", updatedText.text === "Обновленный текст");
        }

        const afterTextSize = changeTextSize(slide1, textObject.id, 24);
        const sizedText = afterTextSize.slideObjects.find(obj => obj.id === textObject.id);
        if (sizedText && sizedText.type === "text") {
            console.log("Изменение размера текста:", sizedText.fontSize === 24);
        }

        const afterFont = changeFontFamily(slide1, textObject.id, "Courier New");
        const fontText = afterFont.slideObjects.find(obj => obj.id === textObject.id);
        if (fontText && fontText.type === "text") {
            console.log("Изменение шрифта:", fontText.fontFamily === "Courier New");
        }
    }

    if (imageObject) {
        const afterMove = changeObjectPosition(slide1, imageObject.id, 500, 500);
        const movedImage = afterMove.slideObjects.find(obj => obj.id === imageObject.id);
        console.log("Перемещение изображения:", movedImage?.x === 500 && movedImage?.y === 500);

        const afterSize = changeObjectSize(slide1, imageObject.id, 400, 300);
        const sizedImage = afterSize.slideObjects.find(obj => obj.id === imageObject.id);
        console.log("Изменение размера изображения:", sizedImage?.w === 400 && sizedImage?.h === 300);
    }

    const newBackground: Background = { type: 'picture', src: "new-bg.jpg" };
    const afterBackground = changeSlideBackground(slide1, newBackground);
    if (afterBackground.background.type === "picture") {
        console.log("Изменение фона:", afterBackground.background.src === "new-bg.jpg");
    }
}