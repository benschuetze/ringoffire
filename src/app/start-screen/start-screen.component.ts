import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Firestore } from 'firebase/firestore';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(private firestore: AngularFirestore
    ,private router: Router) { }

  ngOnInit(): void {
  }

  newGame() {
    // neues spiel in firebase erstellen
    // zu spiel navigieren
    let game = new Game();
    this.firestore
      .collection('games')
      .add(game.toJSON()) // spiel zur sammlung hinzufügen
      .then( (gameInfo: any) => { // wie subscribe, wird jedoch nur 1mal aufgerufen
        this.router.navigateByUrl('/game/' + gameInfo.id); // zum spiel navigieren
      });
    
  }


}
