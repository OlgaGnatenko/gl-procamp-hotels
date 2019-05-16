import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Hotel } from "../models/hotel.model";
import { Pagination } from "../models/pagination.model";
import { Comment } from "../models/comment.model";

import { APP_CONSTANTS } from "../shared/shared.constants";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class HotelService {
  private url: string = `${environment.apiUrl}/hotels`;
  private firstRequest: string = `?_page=1&_limit=${
    APP_CONSTANTS.HOTELS_PER_PAGE
  }`;
  private filterHotelsSrc$ = new Subject<Hotel[]>();
  private hotelsSrc$ = new Subject<Hotel[]>();
  private paginationSrc$ = new Subject<[Pagination, string]>();
  private hotelDetailSrc$ = new Subject<Hotel>();
  private hotelCommentsSrc$ = new Subject<Comment>();

  constructor(private http: HttpClient) {}

  public getFirstHotels() {
    this.getHotelsList(`${this.url}${this.firstRequest}`);
  }

  public filteredHotels$ = this.filterHotelsSrc$.asObservable();
  public hotelsList$ = this.hotelsSrc$.asObservable();
  public hotelDetail$ = this.hotelDetailSrc$.asObservable();
  public hotelComments$ = this.hotelCommentsSrc$.asObservable();
  public pagination$ = this.paginationSrc$.asObservable();

  public filterHotels(value: Array<any>) {
    const title: string = `title_like=${value[0]}`;
    const star: string = `stars=${value[1]}`;

    const queryString = value.reduce((sum, current, index) => {
      if (!sum && current && index === 0) {
        return (sum = `&${title}`);
      } else if (!sum && current > 2 && index === 1) {
        return (sum = `&${star}`);
      } else if (sum && current > 2 && index === 1) {
        return (sum = `${sum}&${star}`);
      } else {
        return sum;
      }
    }, "");

    this.http
      .get<any>(`${this.url}${this.firstRequest}` + queryString, {
        observe: "response"
      })
      .subscribe(res => {
        this.parseResponse(res.headers.get("link"), res.url);
        return this.filterHotelsSrc$.next(res.body);
      });
    return this.filteredHotels$;
  }

  public getHotelsList(url: string) {
    this.http.get<any>(url, { observe: "response" }).subscribe(res => {
      this.parseResponse(res.headers.get("link"), res.url);
      return this.hotelsSrc$.next(res.body);
    });
  }

  public getHotelDetail(id: number) {
    this.http
      .get<any>(`${this.url}/${id}`, { observe: "response" })
      .subscribe(res => {
        this.hotelDetailSrc$.next(res.body);
      });
  }

  public getHotelComments(id: number) {
    this.http
      .get<any>(`${this.url}/${id}`, { observe: "response" })
      .subscribe(res => {
        this.hotelCommentsSrc$.next(res.body.comments);
      });
  }

  private parseResponse(res: any, url?: string): any {
    if (res) {
      const paginationInfoObject: Pagination = {};
      const paginationInfo = res.split(", ").map(i => {
        return i.split("; ").map((i, index) => {
          if (index === 0) {
            return i.substring(i.indexOf("<") + 1, i.lastIndexOf(">"));
          } else {
            return i.substring(i.indexOf('"') + 1, i.lastIndexOf('"'));
          }
        });
      });
      const queryParams = url.substring(url.indexOf("?") + 1);

      paginationInfo.forEach(element => {
        paginationInfoObject[element[1]] = element[0];
      });

      this.paginationSrc$.next([paginationInfoObject, queryParams]);
    }
  }
}
