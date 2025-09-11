function generateId(): string {
    return crypto.randomUUID();
}

function renamePresentation(presentation: Presentation, newTitle: string): Presentation {
    return {
        ...presentation,
        title: newTitle
    }
}

function removeSlide(presentation: Presentation, slideId: string): Presentation {
    const newSlides = presentation.slides.slides.filter(slide => (slide.id !== slideId));
    let newCurrentSlideId: string | null;
    
    if (presentation.slides.currentSlideId === slideId) {
        if (newSlides.length > 0) {
            newCurrentSlideId = newSlides[0].id;
        } else {
            newCurrentSlideId = null;
        }
    } else {
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

function addSlide(presentation: Presentation): Presentation {
    const newSlide: Slide = {
        id: generateId(), 
        slideObjects: [], 
        background: { type: 'color', color: "#ffffff" } 
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

function changeSlidePosition(presentation: Presentation, slideId: string, newPosition: number): Presentation {
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

function addText(slide: Slide, x: number, y: number, text: string): Slide {
    const newText: TextObject = {
        id: generateId(),
        type: "text",
        x: x,
        y: y,
        w: 200, 
        h: 100, 
        text: text,
        fontSize: 14,
        fontFamily: "Gill Sans",
        fontWeight: 400,
        textDecoration: "none",
        textAlign: "left",
        color: "#000000",
        shadow: {
            color: "#000000",
            blur: 0
        }
    };

    return {
        ...slide,
        slideObjects: [...slide.slideObjects, newText]
    };
}

function addImage(slide: Slide, x: number, y: number, src: string): Slide {
    const newImage: ImageObject = {
        id: generateId(),
        type: "image",
        x: x,
        y: y,
        w: 300, 
        h: 200, 
        src: src
    };

    return {
        ...slide,
        slideObjects: [...slide.slideObjects, newImage]
    };
}

function removeObject(slide: Slide, objectId: string): Slide {
    const newObjects = slide.slideObjects.filter(obj => obj.id !== objectId);
    
    return {
        ...slide,
        slideObjects: newObjects
    };
}

function changeObjectPosition(slide: Slide, objectId: string, newX: number, newY: number): Slide {
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

function changeObjectSize(slide: Slide, objectId: string, newWidth: number, newHeight: number): Slide {
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

function changeText(slide: Slide, objectId: string, newText: string): Slide {
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

function changeTextSize(slide: Slide, objectId: string, newSize: number): Slide {
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

function changeFontFamily(slide: Slide, objectId: string, newFont: string): Slide {
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

function changeSlideBackground(slide: Slide, background: Background): Slide {
    return {
        ...slide,
        background: background
    };
}