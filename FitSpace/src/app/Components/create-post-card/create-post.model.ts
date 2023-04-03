export class CreateImageModel {

    title: string;
    description: string;
    img: string;

    constructor(title: string, description: string, img: string) {
        this.title = title;
        this.description = description;
        this.img = img;
    }

} // for image posts

export class CreateTextModel { //for text post
    title: string;
    description: string;

    constructor(title: string, description: string){
        this.title = title;
        this.description = description;
    }
}

export class CreateVidModel { //for video post
    title: string;
    description: string;
    src: string;

    constructor(title: string, description: string, src: string) {
        this.title = title;
        this.description = description;
        this.src = src;
    }
}