import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game: Game; // Game ist hier der Typ der Variable
  gameId: string;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => { // URL Parameter abonnnieren
      this.gameId = params['id'];
      
      this // auf game komponent zugreifen
      .firestore 
      .collection('games') // auf firestore sammlung 'games' zugreifen
      .doc(this.gameId) // auf spiel mit gewünschter id zugreifen
      .valueChanges() 
      .subscribe((game: any) => { // gewünschtes spiel in funtion übergeben, änderungen abonnieren
        console.log('Game Update', game);
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCrad = game.currentCrad;
      })
    })

  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.game.pickCardAnimation && this.game.players.length > 1) {
      this.saveGame();
      this.game.currentCrad = this.game.stack.pop(); // pop() returnt letzten wert aus array und entfernt ihn
      this.game.pickCardAnimation = true;
      
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();

      setTimeout(() => { // deswegen entsteht add player bug
        this.game.pickCardAnimation = false; // weil hier noch false ist wenn schnell erneut geklickt wird
        this.game.playedCards.push(this.game.currentCrad);
        this.saveGame();
      }, 1000)
    } else {
      this.openDialog();
      this.saveGame();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }

  saveGame() {
    this.firestore.collection('games')
    .doc(this.gameId) // .doc um auf dokument zuzugreifen
    .update(this.game.toJSON());
  }

  editPlayer(playerId: number) {
    console.log('edit player', playerId);
    const dialogRef = this.dialog.open(EditPlayerComponent);

    dialogRef.afterClosed().subscribe((change: string) => { // change ist variable pic aus edit-player-component, wird mit mat-dialog -closed übergeben
      console.log('received change', change);
    });
  }

}
