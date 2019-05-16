import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	public isUserAuth: boolean;
	public isCollapsed: boolean = true;

	constructor(
		// private authService: AuthService
	){

	}

	toggleCollapse(): void {
		this.isCollapsed = !this.isCollapsed;
	}

	ngOnInit(){
		// if(this.authService.isLogged !== 'true'){
		// 	this.isUserAuth = false;
		// } else if (this.authService.isLogged === 'true') {
		// 	this.isUserAuth = true;
		// }
	}

}
