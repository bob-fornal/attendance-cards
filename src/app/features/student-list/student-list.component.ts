import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { BroadcastMessage, BroadcastService } from '@core/services/broadcast-channel.service';
import { ToastrService } from 'ngx-toastr';
import { FileSaverService } from 'ngx-filesaver';

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
    private broadcast: BroadcastService,
    private changeDetection: ChangeDetectorRef,
    private toastr: ToastrService,
    private fileSaver: FileSaverService
  ) {
    this.broadcast.messagesOfType('student').subscribe((message: BroadcastMessage) => {
      const student: string = message.payload;
      const card: string = this.pickACard();
      
      this.students.push({ name: student, card: card, winner: false });
      this.changeDetection.detectChanges();

      this.publishStudents();
    });

    this.broadcast.errorHandler().subscribe((error: Event) => {
      this.toastr.error('WebSocket Issue', 'Unhandled');
    });
  }

  ngOnInit(): void {
    this.generateCards();
  }

  publishStudents = () => {
    this.broadcast.publish({
      type: 'admin', payload: [ ...this.students ]
    });
  };

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
    const index: number = this.randomIntFromInterval(0, this.students.length - 1);
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

  storeAttendees = () => {
    let attendees: Array<string> = [];
    this.students.forEach((student: Student) => {
      attendees.push(student.name);
    });
    const list: string = attendees.join('\n');
    const file: Blob = new Blob([list], { type: 'text/plain;charset=utf-8' });
    const filename = `attendees--${ new Date().toISOString().substr(0, 10) }.txt`
    this.fileSaver.save(file, filename);
  };

  deleteUser = (student: Student) => {
    const index: number = this.students.findIndex((item: Student) => item.name === student.name);
    this.students.splice(index, 1);
    this.cards.splice(0, 0, student.card);
    this.publishStudents();
  };

}
