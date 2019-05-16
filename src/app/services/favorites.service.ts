import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { MatSnackBar } from "@angular/material";

import { Favorite } from "../models/favorite.model";
import { APP_CONSTANTS } from "../shared/shared.constants";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class FavoritesService {
  private apiUrl: string = `${environment.apiUrl}/favorites`;
  private favoritesSrc$ = new Subject<any>();
  public favorites$ = this.favoritesSrc$.asObservable();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  private showNotification(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: APP_CONSTANTS.NOTIFICATION_DURATION,
      verticalPosition: "top",
      horizontalPosition: "end"
    });
  }

  public getFavorites(): void {
    this.http.get(this.apiUrl).subscribe((data: Favorite[]) => {
      this.favoritesSrc$.next(data);
    });
  }

  public add(favorite: Favorite): void {
    this.http
      .get(`${this.apiUrl}?id=${favorite.id}`)
      .subscribe((data: Favorite[]) => {
        if (data.length) {
          this.showNotification("This hotel already is your Favorite!");
        } else {
          const { id, title, stars } = favorite;
          this.http
            .post<Favorite>(this.apiUrl, { id, title, stars })
            .subscribe(response => {
              this.favoritesSrc$.next(response);
              this.showNotification(
                "Hotel was successfully added to Favorites!"
              );
            });
        }
      });
  }

  public remove(favorite: Favorite): void {
    this.http.delete(`${this.apiUrl}/${favorite.id}`).subscribe(() => {
      this.favoritesSrc$.next({ delete: favorite.id });
      this.showNotification("Hotel was successfully removed from Favorites!");
    });
  }
}
