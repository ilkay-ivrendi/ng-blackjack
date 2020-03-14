import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DeckService {
  players = [
    { name: "Dealer", cardHand: [] },
    { name: "Sam", cardHand: [] }
  ];
  suits = ["C", "D", "H", "S"];
  values = [
    { name: "2", point: 2 },
    { name: "3", point: 3 },
    { name: "4", point: 4 },
    { name: "5", point: 5 },
    { name: "6", point: 6 },
    { name: "7", point: 7 },
    { name: "8", point: 8 },
    { name: "9", point: 9 },
    { name: "10", point: 10 },
    { name: "J", point: 10 },
    { name: "Q", point: 10 },
    { name: "K", point: 10 },
    { name: "A", point: 11 }
  ];
  deck = [];

  constructor() {}

  getDeck() {
    this.deck = [];
    for (let i = 0; i < this.suits.length; i++) {
      for (let x = 0; x < this.values.length; x++) {
        const deck = {
          suits: this.suits[i],
          values: this.values[x],
          cardID: this.suits[i] + this.values[x].name,
          cardPoint: this.values[x].point
        };
        this.deck.push(deck);
      }
    }
    return this.deck;
  }

  shuffle(deck) {
    deck = [...this.deck];
    // for 1000 turns
    // switch the values of two random cards
    for (let i = 0; i < 1000; i++) {
      const location1 = Math.floor(Math.random() * deck.length);
      const location2 = Math.floor(Math.random() * deck.length);
      const tmp = deck[location1];

      deck[location1] = deck[location2];
      deck[location2] = tmp;
    }
    return deck;
  }

  getPlayers() {
    return this.players;
  }
}
