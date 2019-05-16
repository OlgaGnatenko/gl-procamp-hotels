import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppHotelsModule } from "./app-hotels/app-hotels.module";
import { HeaderComponent } from "./header/header.component";
import { MatDialogModule, MatSnackBarModule } from "@angular/material";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing/app-routing.module";

import { Router } from "@angular/router";

import { SharedModule } from "./shared/shared.module";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { HotelDetailComponent } from "./hotel-detail/hotel-info/hotel-info.component";
import { CommentsComponent } from "./hotel-detail/comments/comments.component";
import { AuthModule } from "./auth/auth.module";
import { UserComponent } from "./user/user.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    ContactComponent,
    HotelDetailComponent,
    CommentsComponent,
    UserComponent
  ],
  imports: [
    AppHotelsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {}
}
