import { Component, input, model, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
   
  public search = model<string>()
  public searchButtonClicked = output<string>()

  public searchValidate() {

  }
}
