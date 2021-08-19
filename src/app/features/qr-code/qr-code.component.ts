
import { Component } from '@angular/core';

import cards from '@core/constants/cards.json';

@Component({
  selector: 'admin-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent {

  cards: any = cards;

  src: string = 'http://localhost:4200/student';
  eddie: string = this.cards.cloudinary.guitar;

  constructor() {
    const url = new URL(window.location.toString());
    const host = new URL('/student', url.origin);
    this.src = host.href;
  }

}
