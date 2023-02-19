import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PhotoService } from './photo.service';

describe('PhotoService', () => {
  let service: PhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [PhotoService]
    });
    service = TestBed.inject(PhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get photos', () => {
    let photoList = service.getPhotos();
    expect(photoList).toBeDefined();
  })

  it('should search photos by a key', () => {
    let photoList = service.searchPhotos('corgi');
    expect(photoList).toBeDefined();
  })

  // it("should create a post in an array", () => {
  //   const qouteText = "This is my first post";
  //   service.addNewQuote(qouteText);
  //   expect(service.quoteList.length).toBeGreaterThanOrEqual(1);
  // });
});
