import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatAutocompleteModule,
  MatCardModule,
  MatButtonModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatDividerModule,
  MatButtonToggleModule,
  MatExpansionModule
} from "@angular/material";
import { MatCheckboxModule } from "@angular/material";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatDividerModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatExpansionModule
  ],
  exports: [
    MatAutocompleteModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatExpansionModule
  ]
})
export class SharedModule {}
