import { Component, Input } from "@angular/core";
import { Profile } from "src/app/models/profile.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent {
  @Input() profile: Profile;
}
