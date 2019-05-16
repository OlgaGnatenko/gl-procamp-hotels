import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RouterModule, Routes } from "@angular/router";
import { AppHotelsComponent } from "../app-hotels/app-hotels.component";
import { AboutComponent } from "../about/about.component";
import { ContactComponent } from "../contact/contact.component";
import { HotelDetailComponent } from "../hotel-detail/hotel-info/hotel-info.component";
import { CommentsComponent } from "../hotel-detail/comments/comments.component";
import { AuthGuard } from "../auth/auth.guard";
import { UserComponent } from "../user/user.component";
import { ListComponent } from "../app-hotels/list/list.component";

const appRoutes: Routes = [
  { path: "", component: AppHotelsComponent },
  { path: "hotels", component: AppHotelsComponent },
  { path: "about", component: AboutComponent },
  { path: "users", component: UserComponent, canActivate: [AuthGuard] },
  {
    path: "contact",
    component: ContactComponent
  },
  {
    path: "hotel-detail/:id",
    component: HotelDetailComponent,
    children: [{ path: "comments", component: CommentsComponent }]
  },
  { path: "**", redirectTo: "hotels" }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
