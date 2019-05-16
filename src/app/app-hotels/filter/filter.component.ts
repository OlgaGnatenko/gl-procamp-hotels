import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.css"]
})
export class FilterComponent {
  public filterOptions: Array<string | number> = ["All", 3, 4, 5];

  @Output() starsFilterValue = new EventEmitter();

  getFilterValue(event: MouseEvent, el: HTMLElement): void {
    event.preventDefault();
    const filterValue: string = el.attributes["data-filtervalue"].value;
    this.starsFilterValue.emit(filterValue);
  }
}
