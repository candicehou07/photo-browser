import { Component } from '@angular/core';
import { PhotoService } from '../_services/photo.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // initialize variables and constants
  //search key
  searchKey : string = "";

  //page
  page: any = 1;
  length: number;
  pageSize : number = 10;
  pageIndex : number = 0;
  pageEvent: PageEvent;

  // photo list
  photoList: any[] = [];

  get_photo_list(page:number) {
    this.photoList = [];
    this.photoService.getPhotos(page)
      .subscribe((res:any) => {
        this.photoList =  res.photos;
        this.length = res.total_results;
        // this.photoList.concat((res as any).photos.map((photo:any) => photo.src.medium));
    })
  }

  search_photos(page:number) {
    if(this.searchKey == "") {
      this.get_photo_list(page);
      return;
    }
    // this.page = 1;
    // this.pageIndex = this.page-1;
    this.request_search_photos(page);
    console.log("search ", this.searchKey, " page ", this.page, " index ", this.pageIndex);
  }

  request_search_photos(page:number) {
    this.photoService.searchPhotos(this.searchKey, page)
      .subscribe((res:any) => {
        this.photoList = res.photos;
        this.length = res.total_results;
      })
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    console.log(e);
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.page = e.pageIndex+1;
    if(this.searchKey == "") {
      this.get_photo_list(this.page);
    } else {
      this.request_search_photos(this.page);
    }
  }

  constructor(
    private photoService: PhotoService,
    private router: Router
  ) {
    console.log("constructor");
  }

  ngOnInit() {
    this.search_photos(this.pageIndex+1);
  }

}
