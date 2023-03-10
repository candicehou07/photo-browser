import { Component } from '@angular/core';
import { PhotoService } from '../_services/photo.service';
import { PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  //search key
  searchKey : any = "";
  prevKey : string = "";

  //page
  page: any = 1;
  length: number;
  pageSize : number = 10;
  pageIndex : number = 0;
  pageEvent: PageEvent;

  // photo list
  photoList: any[] = [];

  // get photo list: a) get photos from photoService 2) update params
  getPhotoList(page:number) {
    this.photoList = [];
    this.photoService.getPhotos(page)
      .subscribe((res:any) => {
        this.photoList = res.photos;
        this.length = res.total_results;
    })
    this.router.navigate(
      ['/home-component'], 
      { queryParams: { page: page} }
    ); 
  }

  // request to search photos: a) search photos using photoService b) update params
  requestSearchPhotos(page:number) {
    this.photoService.searchPhotos(this.searchKey, page)
      .subscribe((res:any) => {
        this.photoList = res.photos;
        this.length = res.total_results;
      })
    this.router.navigate(
      ['/home-component'], 
      { queryParams: { page: page, searchKey: this.searchKey} }
    ); 
  }

  // search photos
  searchPhotos(page:number) {
    // check if this is a new search, update page and pageIndex to default if so
    if(this.ifNewSearch()) {
      page = 1;
      this.pageIndex = 0;
    }

    // if searchKey is empty, get curated photos
    if(this.searchKey == "") {
      this.getPhotoList(page);
      this.prevKey = this.searchKey;
      return;
    }

    // if searchKey, search photos by key 
    this.requestSearchPhotos(page);
    this.prevKey = this.searchKey;
  }

  // check if this is a new search
  ifNewSearch() {
    return this.prevKey !== this.searchKey;
  }

  // page event handling
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.page = e.pageIndex+1;
    if(this.searchKey == "") {
      this.getPhotoList(this.page);
    } else {
      this.requestSearchPhotos(this.page);
    }
  }

  // fetch params from url
  getParams() {
    this.route.queryParams
      .subscribe(params => {
        this.searchKey = params['searchKey'] ? params['searchKey'] : "";
        this.page = params['page'] ? params['page'] : 1;
        this.prevKey = this.searchKey;
        if(this.page > 1) {
          this.pageIndex = this.page-1;
        }
      }
    );
  }

  constructor(
    private photoService: PhotoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // get current params from url
    this.router.navigate(['/'], {queryParamsHandling: "preserve"})
    this.getParams();
    // get photo list
    this.searchPhotos(this.page);
  }

}
