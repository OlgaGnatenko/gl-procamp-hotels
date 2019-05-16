import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Hotel } from "../../models/hotel.model";
import { HotelService } from "../../services/hotel.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-hotel-detail",
  templateUrl: "./hotel-info.component.html",
  styleUrls: ["./hotel-info.component.css"]
})
export class HotelDetailComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  public hotel: Hotel;

  constructor(
    private activateRoute: ActivatedRoute,
    private hotelService: HotelService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.activateRoute.params.subscribe((params: ParamMap) => {
        this.hotelService.getHotelDetail(params["id"]);
      })
    );
    this.subscriptions.add(
      this.hotelService.hotelDetail$.subscribe(data => {
        this.hotel = data;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
