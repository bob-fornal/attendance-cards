
import { Component } from '@angular/core';

import cards from '@core/constants/cards.json';

@Component({
  selector: 'admin-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent {

  cards: any = cards;

  src: string = 'https://bit.ly/attend-cards';
  eddie: string = this.cards.cloudinary.guitar;

  constructor() { }

}
