import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit {
  name: string = '';
  profilePics = [
    '/assets/img/profile/1.webp',
    '/assets/img/profile/2.png',
    '/assets/img/profile/monkey.png',
    '/assets/img/profile/pinguin.svg',
    '/assets/img/profile/serious-woman.svg',
    '/assets/img/profile/winkboy.svg'
  ];
  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>) { }
  

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  selectImage(selectedImage) {
    console.log(selectedImage);
    if(selectedImage.class == 'img-selected') {
      selectedImage.class = 'img-default';
    } else {
      selectedImage.class = 'img-selected';
    }
  }
}
