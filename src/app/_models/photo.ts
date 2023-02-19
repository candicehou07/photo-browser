export class Photo {
    photo_id: number;
    name: string;
    image_url: any;
    photographer: string;

    constructor(photo_id: number, name: string, image_url: any, photographer: string) {
        this.photo_id = photo_id;
        this.name = name;
        this.image_url = image_url;
        this.photographer = photographer;
    }
    
}