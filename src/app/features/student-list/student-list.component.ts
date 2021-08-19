import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { BroadcastMessage, BroadcastService } from '@core/services/broadcast-channel.service';

import { Student } from '@core/interfaces/student';

import config from '@core/constants/cards.json';

@Component({
  selector: 'student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  config: any = config;

  cards: Array<string> = [];
  students: Array<Student> = [];

  selected: boolean = false;

  constructor(
    public broadcast: BroadcastService,
    private changeDetection: ChangeDetectorRef
  ) {
    this.broadcast.messagesOfType('student').subscribe((message: BroadcastMessage) => {
      const student: string = message.payload;
      const card: string = this.pickACard();
      
      this.students.push({ name: student, card: card, winner: false });
      this.changeDetection.detectChanges();

      this.broadcast.publish({
        type: 'admin', payload: [ ...this.students ]
      });
      console.log(this.students);
    });
  }

  ngOnInit(): void {
    this.generateCards();
  }

  trackItem (index: number) {
    return index;
  }

  getCardPath = (card: string): string => {
    const path = this.config.cloudinary.thumb.replace('~~CARD~~', card);
    return path;
  };

  randomIntFromInterval = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  selectWinner = () => {
    this.selected = true;
    const index = this.randomIntFromInterval(0, this.students.length - 1);
    this.students[index].winner = true;
  };

  generateCards = () => {
    this.config.descriptor.forEach((desc: string) => {
      this.config.type.forEach((type: string) => {
        const card: string = `${ type }-${ desc }`;
        this.cards.push(card);
      });
    });
  };

  pickACard = (): string => {
    const index = 0;
    const card = this.cards[index];
    this.cards.splice(index, 1);
    return card;
  };

}
