import { Component, Output, EventEmitter} from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent {
  
  @Output() searchText = new EventEmitter<string>();

  constructor(){}

  public searchHotel(value: string) {
    this.searchText.emit(value);
  }

}
