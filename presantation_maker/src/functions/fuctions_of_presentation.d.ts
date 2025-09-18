import { Presentation, Slide, Background } from "../types/types_of_presantation.js";
export declare function generateId(): string;
export declare function renamePresentation(presentation: Presentation, newTitle: string): Presentation;
export declare function removeSlide(presentation: Presentation, slideId: string): Presentation;
export declare function addSlide(presentation: Presentation): Presentation;
export declare function changeSlidePosition(presentation: Presentation, slideId: string, newPosition: number): Presentation;
export declare function addText(slide: Slide, x?: number, y?: number, text?: string): Slide;
export declare function addImage(slide: Slide, x: number | undefined, y: number | undefined, src: string): Slide;
export declare function removeObject(slide: Slide, objectId: string): Slide;
export declare function changeObjectPosition(slide: Slide, objectId: string, newX: number, newY: number): Slide;
export declare function changeObjectSize(slide: Slide, objectId: string, newWidth: number, newHeight: number): Slide;
export declare function changeText(slide: Slide, objectId: string, newText: string): Slide;
export declare function changeTextSize(slide: Slide, objectId: string, newSize: number): Slide;
export declare function changeFontFamily(slide: Slide, objectId: string, newFont: string): Slide;
export declare function changeSlideBackground(slide: Slide, background: Background): Slide;
//# sourceMappingURL=fuctions_of_presentation.d.ts.map