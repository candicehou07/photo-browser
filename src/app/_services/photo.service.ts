import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private apiKey : string = "6GXn3AGFFnEgxBLM9RmgVKhKoVPTaWQuUAt3l5GUUtWcvugNj2ff00W3"; 

  constructor(
    private http: HttpClient
  ) { }

  getPhotos(page: number = 1) {
  const headers = new HttpHeaders({
    'Authorization':this.apiKey,
  });
    const requestOptions = { headers: headers };
    return  this.http.get(`https://api.pexels.com/v1/curated?per_page=10&page=${page}`, requestOptions)
  }

  searchPhotos(searchKey: string, page: number = 1) {
    const headers = new HttpHeaders({
      'Authorization':this.apiKey,
    });
    const requestOptions = { headers: headers };
    return this.http.get(`https://api.pexels.com/v1/search?query=${encodeURIComponent(searchKey)}&per_page=10&page=${page}`)
  }
}
