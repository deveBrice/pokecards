import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-pokemon-confirm-dialog',
  imports: [MatDialogModule, MatButton],
  templateUrl: './delete-pokemon-confirm-dialog.html',
  styleUrl: './delete-pokemon-confirm-dialog.scss',
})
export class DeletePokemonConfirmDialog {

}
