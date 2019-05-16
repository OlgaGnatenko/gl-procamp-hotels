import { Component, OnInit } from '@angular/core';
import { HotelService } from "../services/hotel.service";
import { Hotel } from '../models/hotel.model';
import { ParamMap, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-hotels',
	templateUrl: './app-hotels.component.html',
	styleUrls: ['./app-hotels.component.css']
})
export class AppHotelsComponent implements OnInit {

	public hotels: Hotel[];
	public selectedHotel: Hotel;
	public hotelsI: Hotel[];

	constructor(
		private hotelService: HotelService,
		private route: ActivatedRoute
	) {
		this.hotelService.hotelsList$.subscribe(data => {
			this.hotels = data;
			this.selectedHotel = data[0];
		})

		this.hotelService.filteredHotels$.subscribe(data => {
			this.hotels = data;
		})
	}

	ngOnInit() {
		this.hotelService.getFirstHotels();
	}

	selectHotel(hotel: Hotel) {
		this.selectedHotel = hotel;
	}
}
