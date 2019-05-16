import { Component, OnInit, OnDestroy } from "@angular/core";
import { FavoritesService } from "src/app/services/favorites.service";
import { Favorite } from "src/app/models/favorite.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-favorites",
  templateUrl: "./favorites.component.html",
  styleUrls: ["./favorites.component.css"]
})
export class FavoritesComponent implements OnInit, OnDestroy {
  constructor(private favoritesService: FavoritesService) {}

  public favorites: Favorite[] = [];
  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.favoritesService.getFavorites();
    this.subscription.add(
      this.favoritesService.favorites$.subscribe(data => {
        if (data.delete) {
          this.favorites = this.favorites.filter(
            item => item.id !== data.delete
          );
        } else {
          this.favorites = [...this.favorites, ...data];
        }
      })
    );
  }

  removeFavorite(favorite: Favorite): void {
    this.favoritesService.remove(favorite);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
