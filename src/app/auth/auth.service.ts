import { Injectable } from "@angular/core";

localStorage.setItem("usertoken", "true");
localStorage.setItem("admintoken", "adminAdmin");

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public isLogged = localStorage.getItem("usertoken");

  public getAuthorizationToken() {
    return localStorage.getItem("admintoken");
  }
}
