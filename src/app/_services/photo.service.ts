import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private apiKey : string = ""; 

  constructor(
    private http: HttpClient
  ) { }
  
  // fetch apiKey
  // Todo: please enter your Pexels API Key in 'src/environment/environment' to update the value
  getKey() {
    this.apiKey = environment.PEXELS_API_KEY === "YOUR_API_KEY" ? "" : environment.PEXELS_API_KEY;
  }

  // get curated photos 
  getPhotos(page: number = 1) {
    this.getKey();
    const headers = new HttpHeaders({
      'Authorization':this.apiKey,
    });
    const requestOptions = { headers: headers };
    return  this.http.get(`https://api.pexels.com/v1/curated?per_page=10&page=${page}`, requestOptions)
  }

  // search photos by key
  searchPhotos(searchKey: string, page: number = 1) {
    this.getKey();
    const headers = new HttpHeaders({
      'Authorization':this.apiKey,
    });
    const requestOptions = { headers: headers };
    return this.http.get(`https://api.pexels.com/v1/search?query=${encodeURIComponent(searchKey)}&per_page=10&page=${page}`)
  }
}
