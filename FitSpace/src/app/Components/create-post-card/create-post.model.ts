export class CreatePostModel {

    title: string;
    description: string;
    img: string;

    constructor(title: string, description: string, img: string) {
        this.title = title;
        this.description = description;
        this.img = img;
    }
}