import { Component, Inject} from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})

export class EditPlayerComponent{
  name: string = '';

  allProfilePictures = [
    '1.webp',
    '2.png',
    'monkey.png',
    'pinguin.svg',
    'serious-woman.svg',
    'winkboy.svg'
  ]

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>
    ) { }



}
