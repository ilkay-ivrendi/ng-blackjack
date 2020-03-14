import { Component, OnInit } from "@angular/core";
import { DeckService } from "./deck.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "BlackJack";
  blackJackForm: FormGroup;
  deck = [];
  cardList = [];
  players;
  cardInput;
  score = 0;
  turn = "";
  gameStart = false;
  winner = "";
  hint = "";
  
  constructor(
    public deckService: DeckService,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.blackJackForm = this.formBuilder.group({
      cardList: ["", [Validators.required]]
    });
    this.players = this.deckService.players;
  }

  getDeck(event: any) {
    this.deck = this.deckService.getDeck();
    this.gameStart = false;
  }

  shuffleDeck() {
    this.deck = this.deckService.shuffle(this.deck);
  }

  tryInput(cardList: any) {
    const inputDeck = this.blackJackForm.get("cardList").value.split(",");
    const tmpDeck = [];
    console.log(inputDeck);
    this.getDeck(cardList);
    console.log(this.deck);
    inputDeck.forEach(element => {
      tmpDeck.push(this.deck.find(x => x.cardID === element));
    });
    console.log(tmpDeck);
    tmpDeck.forEach(element => {
      this.addInput(element);
    });
    this.checkCards(this.players);
  }

  addInput(deck: any ) {
    const hand = deck;
    if (this.turn === "Sam") {
      this.players[1].cardHand.push(hand);
      this.turn = "Dealer";
    } else {
      this.players[0].cardHand.push(hand);
      this.turn = "Sam";
    }
  }

  Play() {
    const dec = this.deck;
    for (let x = 0; x < 2; x++) {
      for (let i = 0; i < this.players.length; i++) {
        const hand = dec.shift();
        this.players[i].cardHand.push(hand);
        this.turn = this.players[i].name;
      }
    }
    this.checkCards(this.players);
    this.gameStart = true;
  }

  hitAgain() {
    const hand = this.deck.shift();
    if (this.turn === "Sam") {
      console.log(this.players[1].name);
      this.players[1].cardHand.push(hand);
      this.turn = "Dealer";
    } else {
      console.log(this.players[0].name);
      this.players[0].cardHand.push(hand);
      this.turn = "Sam";
    }
    this.checkCards(this.players);
  }

  stay() {
    // add this if you want to burn first card in the deck and get next card
    // const hand = this.deck.shift();
    if (this.turn === "Sam") {
      this.turn = "Dealer";
      console.log("turn is on :" + this.turn);
    } else {
      this.turn = "Sam";
      console.log("turn is on :" + this.turn);
    }
    this.checkCards(this.players);
  }

  checkCards(players: any) {
    this.players.forEach(player => {
      const max = 21;
      this.score = 0;
      console.log(player);
      player.cardHand.forEach(cardHand => {
        this.score += cardHand.cardPoint;
      });
      player.cardHand.score = this.score;
      console.log(player.cardHand.score);
      if (this.score >= 17 && this.score < max) {
        this.hint =
          "your hand is greater or equal to 17. You can choce stay to increse your change";
      }
      if (this.score >= max) {
        alert(player.name + " LOST! : Total: " + this.score);
        this.gameStart = false;
        if (player.name === "Sam") {
          this.winner = "Winner is Dealer !!!";
        } else {
          this.winner = "Winner is Sam !!!";
        }
      }
    });
  }

  reset() {
    this.deck = [];
    this.cardList = [];
    this.score = 0;
    this.players = [
      { name: "Dealer", cardHand: [] },
      { name: "Sam", cardHand: [] }
    ];
    this.turn = "";
    this.hint = "";
    this.winner = "";
    this.gameStart = false;
  }
}
