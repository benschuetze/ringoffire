import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
@Input() name: string; //  wird aus game html übergeben
@Input() playerActive: boolean = false; //  wird aus game html übergeben
@Input() profilePic = '1.webp';

  constructor() { }

  ngOnInit(): void {
  }

}
