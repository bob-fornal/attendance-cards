
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Student } from '@core/interfaces/student';

import { BroadcastMessage, BroadcastService } from '@core/services/broadcast-channel.service';

import config from '@core/constants/cards.json';

@Component({
  selector: 'student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  config: any = config;

  username: string = '';
  card: string = '';

  submitted: boolean = false;
  received: boolean = false;

  constructor(
    private broadcast: BroadcastService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Attendance: Student');

    this.broadcast.messagesOfType('admin').subscribe((message: BroadcastMessage) => {
      const students: Array<Student> = message.payload;
      
      let student: Student = students.filter((value) => (value.name === this.username))[0];
      this.card = student.card;
      this.received = true;
    });
  }

  ngOnInit(): void { }

  sendStudentName = () => {
    this.submitted = true;

    const name: string = this.username;
    const message: BroadcastMessage = {
      type: 'student', payload: name
    };
    this.broadcast.publish(message);
    console.log('broadcast', message);
  };

  getCardPath = (card: string): string => {
    const path = this.config.cloudinary.sized.replace('~~CARD~~', card).replace('~~WIDTH~~', `w_${ 250 }`);
    return path;
  };

}
