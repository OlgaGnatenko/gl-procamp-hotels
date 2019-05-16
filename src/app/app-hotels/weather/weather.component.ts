import { Component, Input } from "@angular/core";
import { Hotel } from "src/app/models/hotel.model";

@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"]
})
export class WeatherComponent {
  @Input() hotel: Hotel;
}
