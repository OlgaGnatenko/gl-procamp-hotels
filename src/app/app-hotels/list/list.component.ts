import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnDestroy
} from "@angular/core";
import { Subject, Observable, Subscription } from "rxjs";
import { startWith, combineLatest } from "rxjs/operators";

import { Hotel } from "src/app/models/hotel.model";
import { FavoritesService } from "src/app/services/favorites.service";
import { HotelService } from "src/app/services/hotel.service";
import { APP_CONSTANTS } from "../../shared/shared.constants";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})

export class ListComponent implements OnDestroy {
  private subscription: Subscription = new Subscription();
  private searchByTitleSrc$ = new Subject<any>();
  private starsSrc$ = new Subject<any>();
  private searchByTitle$ = this.searchByTitleSrc$.asObservable();
  private stars$ = this.starsSrc$.asObservable();

  constructor(
    private favoriteHotelsService: FavoritesService,
    private hotelsService: HotelService
  ) {
    this.subscription.add(
      this.filter$.subscribe(val => {
        this.hotelsService.filterHotels(val).subscribe(data => {
          this.hotels = data;
        });
      })
    );
  }

  @Input("hotels") hotels: Hotel[];

  @Output() selectedHotel = new EventEmitter<Hotel>();

  public selectHotel(hotel: Hotel): void {
    this.selectedHotel.emit(hotel);
  }

  public makeFavorite(hotel: Hotel): void {
    event.stopPropagation();
    this.favoriteHotelsService.add(hotel);
  }

  public starsFilter(range: string): any {
    this.starsSrc$.next(Number(range) + APP_CONSTANTS.ADD_TO_FILTER_VALUE);
  }

  public searchByTitle(text: string) {
    this.searchByTitleSrc$.next(text);
  }

  private filter$: Observable<any> = this.searchByTitle$
    .pipe(startWith(0))
    .pipe(combineLatest(this.stars$.pipe(startWith(0))));

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
