import { Component, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { HotelService } from "src/app/services/hotel.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"]
})
export class PaginationComponent implements OnDestroy {
  private subscription: Subscription = new Subscription();
  private prevURL: string;
  private nextURL: string;
  private queryParams: object;
  private url: string = `${environment.apiUrl}/hotels`;

  public canCallNext: boolean;
  public canCallPrevious: boolean;

  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.subscription.add(
      this.hotelService.pagination$.subscribe(data => {
        if (data[0]["prev"]) {
          this.canCallPrevious = true;
          this.prevURL = data[0]["prev"];
        } else {
          this.canCallPrevious = false;
          this.prevURL = null;
        }

        if (data[0]["next"]) {
          this.canCallNext = true;
          this.nextURL = data[0]["next"];
        } else {
          this.canCallNext = false;
          this.nextURL = null;
        }

        this.queryParams = this.decodeQueryParams(data);
        this.router.navigate(["/hotels"], { queryParams: this.queryParams });
      })
    );
  }

  private decodeQueryParams(data: any): object {
    return JSON.parse(
      '{"' + data[1].replace(/&/g, '","').replace(/=/g, '":"') + '"}',
      function(key, value) {
        return key === "" ? value : decodeURIComponent(value);
      }
    );
  }

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    const queryString = Object.keys(params)
      .map(key => key + "=" + params[key])
      .join("&");

    this.hotelService.getHotelsList(`${this.url}?${queryString}`);
  }

  public getPreviousPage(event: MouseEvent) {
    this.hotelService.getHotelsList(this.prevURL);
  }

  public getNextPage(event: MouseEvent) {
    this.hotelService.getHotelsList(this.nextURL);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
